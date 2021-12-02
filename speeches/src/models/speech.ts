import mongoose from "mongoose";

import { UserDoc } from "./user";

interface speechAttrs {
  user: UserDoc;
  co_speakers: UserDoc[];
  topic: string;
  duration: number;

  questions: { user: UserDoc; content: string }[];
  posts: { user: UserDoc; content: string }[];

  attachments: string[];

  status: string;
  session: any;

  rating: number[];

  createdAt: Date;
}

interface SpeechModel extends mongoose.Model<SpeechDoc> {
  build(attrs: speechAttrs): SpeechDoc;
}

export interface SpeechDoc extends mongoose.Document {
  _id: string;
  user: UserDoc;
  co_speakers: UserDoc[];
  topic: string;
  duration: number;

  questions: { user: UserDoc; content: string }[];
  posts: { user: UserDoc; content: string }[];

  attachments: string[];

  status: string;
  session: any;

  rating: number[];

  createdAt: Date;
  version: number;
}

const speechSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    co_speakers: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
    },
    topic: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: false,
    },
    questions: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
    },
    posts: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
    },
    attachments: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    session: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
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

speechSchema.set("versionKey", "version");
speechSchema.statics.build = (attrs: speechAttrs) => {
  return new Speech({
    user: attrs.user,
    co_speakers: attrs.co_speakers,
    topic: attrs.topic,
    duration: attrs.duration,

    questions: attrs.questions,
    posts: attrs.posts,

    attachments: attrs.attachments,

    status: attrs.status,
    session: attrs.session,

    rating: attrs.rating,

    createdAt: new Date(Date.now()),
  });
};

const Speech = mongoose.model<SpeechDoc, SpeechModel>("Speech", speechSchema);

export { Speech };
