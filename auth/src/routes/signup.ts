import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@meetbe/common';
import { User } from '../models/userModel';
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors);
      } else {
        next();
      }
    },
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, firstname, lastname, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, firstname, lastname, password });
    await user.save();

    // PUBLISHING EVENT user:created

    await new UserCreatedPublisher(natsWrapper.client).publish({
      _id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      version: user.version,
    });

    // Generate JWT
    const userJwt = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    //Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
