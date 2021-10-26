const { body, oneOf, validationResult } = require('express-validator');

import { Request, Response, NextFunction } from 'express';

exports.validateProfile = [
  body('age')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage('The age have to be a number'),
  body('phoneNumber').optional({ checkFalsy: true }).isInt(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    } else {
      next();
    }
  },
];
