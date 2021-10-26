import mongoose from 'mongoose';
import { UserDoc } from './user';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ProfileAttrs {
  _id: string;
  user: UserDoc;
  // age: any;
  // birthdate: any;
  // aboutMe: any;
  profilePhoto: string;
  createdAt: Date;
  // hobbys: any[];
  // hometown: any;
  // school: any;
  // profession: any;
  // skills: { title: string; description: string; time: Date }[];
  // experiences: { title: string; description: string; time: Date }[];
  // groups: [string];
  // contacts: [string];
  // photos: [string];
  // events: [string];
  // posts: [string];
  // comments: [string];
  // currentJob: any;
  // phoneNumber: any;
}

interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}

interface ProfileDoc extends mongoose.Document {
  user: UserDoc;
  age: string;
  birthdate: string;
  aboutMe: string;
  profilePhoto?: any;
  createdAt: string;
  hobbys: [string];
  hometown: string;
  school: string;
  profession: string;
  experiences: { title: string; description: string; time: Date }[];
  skills: { title: string; description: string; time: Date }[];
  groups: [string];
  contacts: [string];
  photos: [string];
  events: [string];
  posts: [string];
  comments: [string];
  currentJob: string;
  phoneNumber: string;
  version: number;
}

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    aboutMe: {
      type: String,
      required: false,
    },
    profilePhoto: {
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
    hometown: {
      type: String,
      required: false,
    },
    school: {
      type: String,
      required: false,
    },
    hobbys: {
      type: Array,
      required: false,
    },
    experiences: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
    },
    skills: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
    },
    groups: {
      type: Array,
      required: false,
    },
    contacts: {
      type: Array,
      required: false,
    },
    photos: {
      type: Array,
      required: false,
    },
    events: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Events',
      required: false,
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Posts',
      required: false,
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Comments',
      required: false,
    },
    profession: {
      type: String,
      required: false,
    },
    currentJob: {
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

profileSchema.set('versionKey', 'version');
profileSchema.plugin(updateIfCurrentPlugin);
profileSchema.statics.build = (attrs: ProfileAttrs) => {
  return new Profile({
    _id: attrs._id,
    user: attrs.user,
    // age: attrs.age,
    // birthdate: attrs.birthdate,
    // aboutMe: attrs.aboutMe,
    profilePhoto: attrs.profilePhoto,
    // createdAt: new Date(Date.now()).toString(),
    // hobbys: attrs.hobbys,
    // hometown: attrs.hometown,
    // school: attrs.school,
    // profession: attrs.profession,
    // experiences: attrs.experiences,
    // currentJob: attrs.currentJob,
    // phoneNumber: attrs.phoneNumber,
  });
};

const Profile = mongoose.model<ProfileDoc, ProfileModel>(
  'Profile',
  profileSchema
);

export { Profile };
