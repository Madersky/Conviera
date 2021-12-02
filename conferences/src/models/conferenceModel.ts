import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

import { ApplicationDoc } from "./application";
import { UserDoc } from "./user";

interface conferenceAttrs {
  name: string;
  description: string;
  registrationStartDate: Date;
  registrationEndDate: Date;
  conferenceStartDate: Date;
  conferenceEndDate: Date;

  mode: string;
  conferenceCountry: string;
  conferenceVenue: string;
  conferenceCity: string;
  conferenceStreet: string;
  conferenceProvince: string;

  discipline: string[];
  keywords: string[];

  organizers: string[];
  creator: UserDoc;
  participants: { user: UserDoc; role: string }[];

  cost: string;

  contactEmail: string;
  contactSite: string;
  phoneNumber: string;

  createdAt: Date;
}

interface ConferenceModel extends mongoose.Model<ConferenceDoc> {
  build(attrs: conferenceAttrs): ConferenceDoc;
}

export interface ConferenceDoc extends mongoose.Document {
  _id: string;
  name: string;
  description: string;
  registrationStartDate: Date;
  registrationEndDate: Date;
  conferenceStartDate: Date;
  conferenceEndDate: Date;

  mode: string;
  conferenceCountry: string;
  conferenceVenue: string;
  conferenceCity: string;
  conferenceStreet: string;
  conferenceProvince: string;

  discipline: string[];
  keywords: string[];

  organizers: string[];
  creator: UserDoc;
  moderators: UserDoc[];
  committee: UserDoc[];
  speakers: UserDoc[];
  participants: { user: UserDoc; role: string }[];
  applications: ApplicationDoc[];
  sessions: any[];
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

  version: number;
  createdAt: Date;
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
    conferenceCountry: {
      type: String,
      required: false,
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
    committee: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
    },
    participants: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
    },
    applications: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Application",
      required: false,
    },
    sessions: {
      type: [mongoose.Schema.Types.ObjectId],
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
      type: Date,
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
    name: attrs.name,
    description: attrs.description,
    registrationStartDate: attrs.registrationStartDate,
    registrationEndDate: attrs.registrationEndDate,
    conferenceStartDate: attrs.conferenceStartDate,
    conferenceEndDate: attrs.conferenceEndDate,

    mode: attrs.mode,
    conferenceCountry: attrs.conferenceCountry,
    conferenceVenue: attrs.conferenceVenue,
    conferenceCity: attrs.conferenceCity,
    conferenceStreet: attrs.conferenceStreet,
    conferenceProvince: attrs.conferenceProvince,

    discipline: attrs.discipline,
    keywords: attrs.keywords,

    organizers: attrs.organizers,
    creator: attrs.creator,

    participants: attrs.participants,

    cost: attrs.cost,

    contactEmail: attrs.contactEmail,
    contactSite: attrs.contactSite,
    phoneNumber: attrs.phoneNumber,

    createdAt: new Date(Date.now()),
  });
};

const Conference = mongoose.model<ConferenceDoc, ConferenceModel>(
  "Conference",
  conferenceSchema
);

export { Conference };
