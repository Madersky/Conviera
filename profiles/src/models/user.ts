import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
interface UserAttrs {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  firstname: string;
  lastname: string;
  version: number;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
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

userSchema.set('versionKey', 'version');
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User({
    _id: attrs._id,
    email: attrs.email,
    firstname: attrs.firstname,
    lastname: attrs.lastname,
  });
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
