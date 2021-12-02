const { body, validationResult } = require("express-validator");

import { Request, Response, NextFunction } from "express";

exports.validateProfilePatch = [
  body("age")
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage("The age have to be a number"),
  body("phoneNumber")
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage("The Phone Number have to be a number"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    } else {
      next();
    }
  },
];
