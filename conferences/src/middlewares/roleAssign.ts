import { Request, Response, NextFunction } from "express";

import { Conference } from "../models/conferenceModel";

export const roleAssign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new Error("currentUser does not exist");
  }

  const conference = await Conference.findById(req.params._id).populate(
    "creator"
  );

  if (!conference) {
    throw new Error("Conference does not exist");
  } else {
    res.locals.conference = conference;
  }

  const user = conference?.participants.find(
    (participant) =>
      participant.user._id.toString() === req.currentUser?._id.toString()
  );

  res.locals.role = user?.role || "none";

  //   console.log("middleware", res.locals);
  next();
};
