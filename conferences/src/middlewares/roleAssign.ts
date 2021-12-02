import { Request, Response, NextFunction } from "express";
import { NotFoundError, ApplicationStatus, RoleTypes } from "@conviera/common";

import { Conference } from "../models/conferenceModel";

export const roleAssign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotFoundError();
  }

  const conference = await Conference.findById(req.params._id)
    .populate("creator")
    .populate("applications");

  if (!conference) {
    throw new Error("ERROR !! confernece not found");
  }

  const user = conference?.participants.find(
    (participant) =>
      participant.user._id.toString() === req.currentUser?._id.toString()
  );

  const isApplicant = conference?.applications.find(
    (application) =>
      application.user._id.toString() === req.currentUser?._id.toString() &&
      application.status !== ApplicationStatus.Accepted &&
      ApplicationStatus.Rejected
  );

  res.locals.role = user?.role || RoleTypes.None;
  res.locals.isApplicant = !!isApplicant;

  console.log("middleware", res.locals);
  next();
};
