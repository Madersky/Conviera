import { Request, Response, NextFunction } from "express";
import { ConferenceCreatedPublisher } from "../events/publishers/conference-created-publisher";
import { ConferenceUpdatedPublisher } from "../events/publishers/conference-updated-publisher";

import { Conference } from "../models/conferenceModel";
import { User, UserDoc } from "../models/user";
import { natsWrapper } from "../nats-wrapper";

exports.getAllConferences = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    const conferences = await Conference.find().populate("creator");

    res.status(200).send({ conferences: conferences, users: users });
  } catch (err) {
    res.status(404).send(`ERROR!! ${err}`);
  }
};

exports.getAllConferencesByDiscipline = async (req: Request, res: Response) => {
  try {
    if (req.params.discipline === "All disciplines") {
      const conferences = await Conference.find();
      return res.status(200).send({ conferences: conferences });
    } else {
      const conferences = await Conference.find()
        .where("discipline")
        .equals(req.params.discipline)
        .populate("creator");
      return res.status(200).send({ conferences: conferences });
    }
  } catch (err) {
    res.status(404).send(`ERROR!! ${err}`);
  }
};

exports.getConference = async (req: Request, res: Response) => {
  try {
    // const user = await User.findById(req.currentUser?._id)
    // console.log("user fomr getConference CONTROLLER", user)
    const conference = await Conference.findById(req.params._id)
      .populate("applications")
      .populate("creator");

    // if (!req.currentUser) {
    //   throw new Error();
    // }

    // const user = conference?.participants.find(
    //   (participant) =>
    //     participant.user._id.toString() === req.currentUser?._id.toString()
    // );
    // const applicant = conference?.applicants.find(
    //   (applicant) =>
    //     applicant.user._id.toString() === req.currentUser?._id.toString()
    // );
    // if (!res.locals.conference) {
    //   throw new Error("bad data in request");
    // } else {
    res.status(200).send({
      conference: conference,
      role: res.locals.role,
    });
    // }

    // res.status(200).send({
    //   conference: res.locals.conference,
    //   role: user?.role || "none",
    //   isApplicant: !!applicant,
    // });
  } catch (err) {
    res.status(404).send(`ERROR!! ${err}`);
  }
};

exports.createConference = async (req: Request, res: Response) => {
  try {
    let conferenceAttrs = req.body;
    const existingUser = await User.findById(conferenceAttrs.creator._id);
    const conference = await Conference.build(conferenceAttrs);
    if (!existingUser) {
      const user = await User.build(req.body.creator);
      await user.save();
      conference.participants.push({ user: user, role: "creator" });
    } else {
      conference.participants.push({ user: existingUser, role: "creator" });
    }

    await conference.save();

    await new ConferenceCreatedPublisher(natsWrapper.client).publish({
      _id: conference._id,
      name: conference.name,
      description: conference.description,
      registrationStartDate: conference.registrationStartDate,
      registrationEndDate: conference.registrationEndDate,
      conferenceStartDate: conference.conferenceStartDate,
      conferenceEndDate: conference.conferenceEndDate,

      mode: conference.mode,
      conferenceCountry: conference.conferenceCountry,
      conferenceVenue: conference.conferenceVenue,
      conferenceCity: conference.conferenceCity,
      conferenceStreet: conference.conferenceStreet,
      conferenceProvince: conference.conferenceProvince,
      discipline: conference.discipline,
      keywords: conference.keywords,

      organizers: conference.organizers,
      creator: conference.creator,
      moderators: conference.moderators,
      committee: conference.committee,
      speakers: conference.speakers,
      participants: conference.participants,
      applications: conference.applications,
      sessions: conference.sessions,
      speeches: conference.speeches,

      cost: conference.cost,

      contactEmail: conference.contactEmail,
      contactSite: conference.contactSite,
      phoneNumber: conference.phoneNumber,

      posts: conference.posts,
      version: conference.version,
      createdAt: conference.createdAt,
    });

    res.status(200).send({ conferences: conference || null });
  } catch (err) {
    res.status(404).send(`ERROR!! ${err}`);
  }
};
