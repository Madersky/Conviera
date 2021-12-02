import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

import { ApplicationStatus } from "@conviera/common";
import { RoleTypes } from "@conviera/common";

import { UserDoc } from "./user";
import { ConferenceDoc } from "./conference";

interface ApplicationAttrs {
  _id: string;
  conference: ConferenceDoc;
  user: UserDoc;
  attachments?: any[];
  role: RoleTypes;
  status: ApplicationStatus;

  createdAt: Date;
}

export interface ApplicationDoc extends mongoose.Document {
  conference: ConferenceDoc;
  user: UserDoc;
  attachments?: any[];
  role: RoleTypes;
  status: ApplicationStatus;

  createdAt: Date;
  version: number;
}

interface ApplicationModel extends mongoose.Model<ApplicationDoc> {
  build(attrs: ApplicationAttrs): ApplicationDoc;
}

const applicationSchema = new mongoose.Schema(
  {
    conference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conference",
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    attachments: {
      type: String,
      require: false,
    },
    role: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    createdAt: {
      type: String,
      require: true,
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

applicationSchema.set("versionKey", "version");
applicationSchema.plugin(updateIfCurrentPlugin);

applicationSchema.statics.build = (attrs: ApplicationAttrs) => {
  return new Application({
    _id: attrs._id,
    conference: attrs.conference,
    user: attrs.user,
    attachments: attrs.attachments,
    role: attrs.role,
    status: attrs.status,

    createdAt: new Date(Date.now()).toString(),
  });
};

const Application = mongoose.model<ApplicationDoc, ApplicationModel>(
  "Application",
  applicationSchema
);

export { Application };
