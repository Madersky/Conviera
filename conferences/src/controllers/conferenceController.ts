import { Request, Response, NextFunction } from "express";

import { Conference } from "../models/conferenceModel";
import { User } from "../models/user";

exports.getAllConferences = async (req: Request, res: Response) => {
  try {
    const conferences = await Conference.find().populate("creator");
    // console.log(conferences);
    res.status(200).send({ conferences: conferences });
  } catch (err) {
    res.status(404).send(`ERROR!! ${err}`);
  }
};

exports.createConference = async (req: Request, res: Response) => {
  try {
    let conferenceAttrs = req.body;

    const existingUser = await User.find(req.body.creator);

    if (existingUser != null) {
      const user = await User.build(req.body.creator);
      await user.save();
    }

    console.log(conferenceAttrs);

    const conference = await Conference.build(conferenceAttrs);
    await conference.save();
    // console.log(conference);
    res.status(200).send({ conferences: conference || null });
  } catch (err) {
    res.status(404).send(`ERROR!! ${err}`);
  }
};
