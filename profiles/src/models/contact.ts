import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
interface ContactAttrs {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface ContactDoc extends mongoose.Document {
  email: string;
  firstname: string;
  lastname: string;
  version: number;
}

interface ContactModel extends mongoose.Model<ContactDoc> {
  build(attrs: ContactAttrs): ContactDoc;
}

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
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

contactSchema.set("versionKey", "version");
contactSchema.plugin(updateIfCurrentPlugin);

contactSchema.statics.build = (attrs: ContactAttrs) => {
  return new Contact({
    _id: attrs._id,
    email: attrs.email,
    firstname: attrs.firstname,
    lastname: attrs.lastname,
  });
};

const Contact = mongoose.model<ContactDoc, ContactModel>(
  "Contact",
  contactSchema
);

export { Contact };
