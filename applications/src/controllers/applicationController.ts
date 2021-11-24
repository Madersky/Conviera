import { Request, Response } from "express";

import { ApplicationCreatedPublisher } from "../events/publishers/application-created-publisher";
import { Application } from "../models/application";
import { User } from "../models/user";
import { natsWrapper } from "../nats-wrapper";

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

exports.createApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.build(req.body);
    await application.save();
    console.log(application);

    await new ApplicationCreatedPublisher(natsWrapper.client).publish({
      _id: application._id,
      conference: application.conference,
      user: application.user,
      role: application.role,
      status: application.status,
      createdAt: application.createdAt,
    });

    res.status(200).send({ application: application });
  } catch (err) {
    console.log(err);
    res.status(404).send(`ERROR!! ${err}`);
  }
};
