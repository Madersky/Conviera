import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

import { UserDoc } from "./user";

interface conferenceAttrs {
  _id: string;
  name: string;
  description: string;
  registrationStartDate: Date;
  registrationEndDate: Date;
  conferenceStartDate: Date;
  conferenceEndDate: Date;

  mode: string;
  conferenceVenue: string;
  conferenceCity: string;
  conferenceStreet: string;
  conferenceProvince: string;

  discipline: string[];
  keywords: string[];

  organizers: string[];
  creator: UserDoc;
  moderators: UserDoc[];
  speakers: UserDoc[];
  participants: UserDoc[];
  applicants: { user: UserDoc; attachment: string }[];
  speeches: {
    user: UserDoc;
    topic: string;
    questions: string[];
    posts: string[];
    reviews: string[];
  }[];

  cost: string;

  contactEmail: string;
  contactSite: string;
  phoneNumber: string;

  posts: string[];

  createdAt: string;
}

interface ConferencesModel extends mongoose.Model<ConferenceDoc> {
  build(attrs: conferenceAttrs): ConferenceDoc;
}

export interface ConferenceDoc extends mongoose.Document {
  name: string;
  description: string;
  registrationStartDate: Date;
  registrationEndDate: Date;
  conferenceStartDate: Date;
  conferenceEndDate: Date;

  mode: string;
  conferenceVenue: string;
  conferenceCity: string;
  conferenceStreet: string;
  conferenceProvince: string;

  discipline: string[];
  keywords: string[];

  organizers: UserDoc[];
  creator: UserDoc;
  moderators: UserDoc[];
  speakers: UserDoc[];
  participants: UserDoc[];
  applicants: { user: UserDoc; attachment: string }[];
  speeches: {
    user: UserDoc;
    topic: string;
    questions: string[];
    posts: string[];
    reviews: string[];
  }[];

  cost: string;

  email: string;
  site: string;
  phoneNumber: string;

  posts: string[];

  version: number;
}

const conferenceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    registrationStartDate: {
      type: Date,
      required: true,
    },
    registrationEndDate: {
      type: Date,
      required: true,
    },
    conferenceStartDate: {
      type: Date,
      required: true,
    },
    conferenceEndDate: {
      type: Date,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    conferenceVenue: {
      type: String,
      required: false,
    },
    conferenceCity: {
      type: String,
      required: false,
    },
    conferenceStreet: {
      type: String,
      required: false,
    },
    conferenceProvince: {
      type: String,
      required: false,
    },
    discipline: {
      type: [String],
      required: true,
    },
    keywords: {
      type: [String],
      required: false,
    },
    organizers: {
      type: [String],
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moderators: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: false,
    },
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: false,
    },
    applicants: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
    },
    speeches: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
    },
    cost: {
      type: String,
      required: false,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    contactSite: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    createdAt: {
      type: String,
      default: Date.now(),
      required: true,
    },
    posts: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._v;
      },
    },
  }
);

conferenceSchema.set("versionKey", "version");
conferenceSchema.plugin(updateIfCurrentPlugin);
conferenceSchema.statics.build = (attrs: conferenceAttrs) => {
  return new Conference({
    _id: attrs._id,
    name: attrs.name,
    description: attrs.description,
    registrationStartDate: attrs.registrationStartDate,
    registrationEndDate: attrs.registrationEndDate,
    conferenceStartDate: attrs.conferenceStartDate,
    conferenceEndDate: attrs.conferenceEndDate,

    mode: attrs.mode,
    conferenceVenue: attrs.conferenceVenue,
    conferenceCity: attrs.conferenceCity,
    conferenceStreet: attrs.conferenceStreet,
    conferenceProvince: attrs.conferenceProvince,

    discipline: attrs.discipline,
    keywords: attrs.keywords,

    organizers: attrs.organizers,
    creator: attrs.creator,
    moderators: attrs.moderators,
    speakers: attrs.speakers,
    participants: attrs.participants,
    applicants: attrs.applicants,
    speeches: attrs.speeches,

    cost: attrs.cost,

    contactEmail: attrs.contactEmail,
    contactSite: attrs.contactSite,
    phoneNumber: attrs.phoneNumber,

    posts: attrs.posts,

    createdAt: new Date(Date.now()).toString(),
  });
};

const Conference = mongoose.model<ConferenceDoc, ConferencesModel>(
  "Conference",
  conferenceSchema
);

export { Conference };
