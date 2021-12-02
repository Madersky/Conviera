import { User } from "../models/user";
import { ConferenceCreatedPublisher } from "../events/publishers/conference-created-publisher";
import { Conference } from "../models/conferenceModel";
import { natsWrapper } from "../nats-wrapper";
import { ConferenceDeletedPublisher } from "../events/publishers/conference-deleted-publisher";

// const { email, firstname, lastname, password } = req.body;

// const existingUser = await User.findOne({ email });

// if (existingUser) {
//   throw new BadRequestError("Email in use");
// }

// const user = User.build({ email, firstname, lastname, password });
// await user.save();

// // PUBLISHING EVENT user:created

// await new UserCreatedPublisher(natsWrapper.client).publish({
//   _id: user._id,
//   email: user.email,
//   firstname: user.firstname,
//   lastname: user.lastname,
//   version: user.version,
// });

// const names = ["Łukasz", "Andrzej", "Władysław", "Paulina", "Anna", "Zbigniew"];
// const surnames = ["Sarski", "Dębski", "Kowalski", "Nowak", "Skalar", "Suska"];

const populate = async () => {
  try {
    const conferences = await Conference.find();

    if (!conferences.length) {
      const users = await User.find();

      const createdConferences = users.map((user) => {
        let conferenceAttrs = {
          creator: user,
          name: `Conference created by ${user.firstname} ${user.lastname}`,
          organizers: ["Opole University of Technology"],
          cost: "500",
          discipline: ["IT Engineering"],
          description: `Conference created by ${user.firstname} ${user.lastname}`,
          registrationStartDate: new Date(),
          registrationEndDate: new Date(),
          conferenceStartDate: new Date(),
          conferenceEndDate: new Date(),
          mode: "stationary",
          conferenceCountry: "Poland",
          conferenceVenue: "Dom Kultury",
          conferenceCity: "Wrocław",
          participants: [{ user: user, role: "creator" }],
          conferenceStreet: "ul. Długa 20",
          conferenceProvince: "Dolnośląskie",
          contactEmail: user.email,
          contactSite: "https://essa.com",
          phoneNumber: "9990990998",
          keywords: [],
          createdAt: new Date(),
        };
        return Conference.build(conferenceAttrs);
      });

      createdConferences.map(async (conference) => {
        await conference.save();
      });

      createdConferences.map(async (conference) => {
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
      });
    } else {
      console.log("There are already populated conferences // populate exit");
    }
  } catch (err) {
    console.log(err);
  }

  // const user = User.build({ email, firstname, lastname, password });
  // let createdUsers = users.map((user: any) => {
  //   let { email, firstname, lastname, password } = user;
  //   return User.build({ email, firstname, lastname, password });
  // });

  //   console.log("to jest createdUsers", createdUsers);

  // createdUsers.map(async (user: any) => {
  //   await user.save();
  // });

  // createdUsers.map(async (user: any) => {
  //   await new UserCreatedPublisher(natsWrapper.client).publish({
  //     _id: user._id,
  //     email: user.email,
  //     firstname: user.firstname,
  //     lastname: user.lastname,
  //     version: user.version,
  //   });
  // });
};

export default populate;
