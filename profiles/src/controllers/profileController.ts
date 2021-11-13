import { Request, Response, NextFunction } from "express";

import { Profile } from "../models/profile";
import { User } from "../models/user";
import { BadRequestError } from "@conviera/common";

exports.getAllProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await User.find();
    const allProfiles = await Profile.find().populate("user");
    // .populate({
    //   path: "conferences",
    //   populate: { path: "creator", model: "User" },
    // });

    res
      .status(200)
      .send({ profiles: allProfiles || null, users: allUsers || null });
  } catch (err) {
    res.status(404).send(`ERROR!! ${err}`);
  }
};

exports.getProfileByUserId = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findById(req.params._id).populate("user");
    res.status(200).send({ profile: profile });
  } catch (err) {
    res.status(404).send(`ERRROR! ${err}`);
  }
};

exports.getProfileByEmail = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.where("email").equals(req.params.email);
    res.status(200).send({ profile: profile || null });
  } catch (err) {
    res.status(404).send(`ERROR! ${err}`);
  }
};

exports.createPublication = async (req: Request, res: Response) => {
  try {
    const newPublication = req.body.publications;
    const profile = await Profile.findByIdAndUpdate(
      req.params._id,
      {
        $addToSet: {
          publications: newPublication,
        },
      },
      {
        new: true,
      }
    );
    if (!profile) {
      throw new Error("Profile not found!");
    }
    await profile.save();
    res.status(200).send({ profile: profile || null });
  } catch (err) {
    res.status(400).send(`Error! ${err}`);
  }
};

exports.patchProfilePhoto = async (req: Request, res: Response) => {
  try {
    const photoUrl = req.body.photoUrl;

    const profile = await Profile.findByIdAndUpdate(req.params._id, {
      profilePhoto: photoUrl,
    });

    if (!profile) {
      throw new Error("Profile not found");
    }

    await profile.save();
    res.status(200).send({ profile: profile || null });
  } catch (err) {
    res.status(402).send({ msg: `ERROR! patchProfilePhoto ${err}` });
  }
};

exports.patchProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params._id, req.body);

    if (!profile) {
      throw new Error("Profile not found");
    }
    await profile.save();
    res.status(200).send({ profile: profile || null });
  } catch (err) {
    res.status(404).send(`ERROR! ${err}`);
  }
};

exports.deleteValueFromArrayProfile = async (req: Request, res: Response) => {
  try {
    const tab = req.body.tab;
    const value = req.body.value;

    const profile = await Profile.findByIdAndUpdate(req.params._id, {
      // [tab] tak się wpisuje zmienną jako pole w modelu
      $pull: { [tab]: value },
    });
    if (!profile) {
      throw new Error("Profile not found");
    }

    console.log(
      `Usunieto takie value: ${value}, z takiej tablicy: ${req.body.tab}`
    );
    await profile.save();
    res.status(200).send({ profile: profile || null });
  } catch (err) {
    res.status(404).send(`ERROR! deleteProfileProperty ${err}`);
  }
};
