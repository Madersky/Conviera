import { Request, Response } from "express";

import { ApplicationStatus, NotFoundError } from "@conviera/common";

import { ApplicationCreatedPublisher } from "../events/publishers/application-created-publisher";
import { ApplicationUpdatedPublisher } from "../events/publishers/application-updated-publisher";

import { Application } from "../models/application";
import { User } from "../models/user";
import { natsWrapper } from "../nats-wrapper";
import { Conference } from "../models/conference";

exports.getAllApplications = async (req: Request, res: Response) => {
  try {
    // const conferences = await Conference.find();
    const users = await User.find();
    const applications = await Application.find().populate("conference");
    res.status(200).send({ users: users, applications: applications });
  } catch (err) {
    console.log(err);
  }
};

exports.getUserApplications = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find()
      .populate("user")
      .populate("conference")
      .where("user")
      .equals(req.currentUser?._id);

    res.status(200).send({ applications: applications });
  } catch (err) {
    throw new Error(`ERROR !! ${err}`);
  }
};

exports.manageApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.findById(req.body._id);
    if (!application) throw new Error("ERROR !! application not found");

    if (application.status !== ApplicationStatus.AwaitingAcceptance) {
      throw new Error(`ERROR !! Application already ${application.status}`);
    }

    application.set({ status: req.body.status });

    await application.save();

    await new ApplicationUpdatedPublisher(natsWrapper.client).publish({
      _id: application._id,
      status: application.status,
      createdAt: application.createdAt,
      version: application.version,
    });

    res.status(200).send({ application: application });
  } catch (err) {
    res.status(404).send(`ERROR!! ${err}`);
  }
};

exports.createApplication = async (req: Request, res: Response) => {
  try {
    const conferenceApplications = await Application.find()
      .where("conference")
      .equals(req.body.conference._id);

    const userApplication = conferenceApplications.filter(
      (application) =>
        application.user.toString() === req.currentUser!._id.toString()
    );

    if (userApplication.length > 0) {
      throw new Error("ERROR !! User already applied for this conference");
    }

    const application = await Application.build(req.body);

    await application.save();

    await new ApplicationCreatedPublisher(natsWrapper.client).publish({
      _id: application._id,
      conference: application.conference,
      attachments: application.attachments,
      user: application.user,
      role: application.role,
      status: application.status,
      createdAt: application.createdAt,
      version: application.version,
    });

    res.status(200).send({ application: application });
  } catch (err) {
    console.log(err);
    res.status(404).send(`ERROR!! ${err}`);
  }
};
