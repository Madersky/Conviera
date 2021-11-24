import mongoose from "mongoose";
import { UserDoc } from "./user";
import { ContactDoc } from "./contact";
import { ConferenceDoc } from "./conference";
import { ApplicationDoc } from "./application";

import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ProfileAttrs {
  _id: string;
  user: UserDoc;
  age: number;
  birthdate: any;
  aboutMe: string;
  profilePhoto: string;

  school: string;
  profession: string;
  academicTitle: string;
  publications: {
    title: string;
    description: string;
    time: Date;
    doi: string;
  }[];
  applications: ApplicationDoc[];
  conferences: ConferenceDoc[];
  contacts: [ContactDoc];
  organizations: string[];
  events: [string];
  notifications: [];
  posts: [string];
  comments: [string];
  phoneNumber: string;

  createdAt: Date;
}

interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attrs: any): ProfileDoc;
}

interface ProfileDoc extends mongoose.Document {
  user: UserDoc;
  age: number;
  birthdate: string;
  aboutMe: string;
  profilePhoto: string;

  school: string;
  profession: string;
  academicTitle: string;
  publications: {
    title: string;
    description: string;
    time: Date;
    doi: string;
  }[];
  applications: ApplicationDoc[];
  conferences: ConferenceDoc[];
  contacts: [ContactDoc];
  organizations: string[];
  events: [string];
  notifications: [];
  posts: [string];
  comments: [string];

  phoneNumber: string;

  createdAt: Date;
  version: number;
}

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    aboutMe: {
      type: String,
      required: false,
    },
    profilePhoto: {
      type: String,
      required: false,
    },
    academicTitle: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      requided: false,
    },
    birthdate: {
      type: String,
      required: false,
    },
    school: {
      type: String,
      required: false,
    },
    publications: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
    },
    contacts: {
      type: [mongoose.Schema.Types.Mixed],
      ref: "Contact",
      required: false,
    },
    applications: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Application",
      required: false,
    },
    conferences: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Conference",
      required: false,
    },
    organizations: {
      type: [mongoose.Schema.Types.Mixed],
      ref: "Organizations",
      required: false,
    },
    events: {
      type: [mongoose.Schema.Types.Mixed],
      ref: "Event",
      required: false,
    },
    notifications: {
      type: [mongoose.Schema.Types.Mixed],
      ref: "Notification",
      required: false,
    },
    posts: {
      type: [mongoose.Schema.Types.Mixed],
      ref: "Post",
      required: false,
    },
    comments: {
      type: [mongoose.Schema.Types.Mixed],
      ref: "Comment",
      required: false,
    },
    profession: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
      required: true,
    },
  },

  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

profileSchema.set("versionKey", "version");
profileSchema.plugin(updateIfCurrentPlugin);
profileSchema.statics.build = (attrs: ProfileAttrs) => {
  return new Profile({
    _id: attrs._id,
    user: attrs.user,
    age: attrs.age,
    birthdate: attrs.birthdate,
    aboutMe: attrs.aboutMe,
    profilePhoto: attrs.profilePhoto,
    school: attrs.school,
    profession: attrs.profession,
    academicTitle: attrs.academicTitle,
    publications: attrs.publications,
    applications: attrs.applications,
    conferences: attrs.conferences,
    organizations: attrs.organizations,
    contacts: attrs.contacts,
    events: attrs.events,
    notifications: attrs.notifications,
    posts: attrs.posts,
    comments: attrs.comments,
    phoneNumber: attrs.phoneNumber,

    createdAt: new Date(Date.now()).toString(),
  });
};

const Profile = mongoose.model<ProfileDoc, ProfileModel>(
  "Profile",
  profileSchema
);

export { Profile };
