import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { User } from "../models/userModel";
import { natsWrapper } from "../natsWrapper";

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

const populate = () => {
  const users = [
    {
      email: "lukasz@sarski.com",
      firstname: "Łukasz",
      lastname: "Sarski",
      password: "admin",
    },
    {
      email: "andrzej@debski.com",
      firstname: "Andrzej",
      lastname: "Dębski",
      password: "admin",
    },
    {
      email: "wladyslaw@kowalski.com",
      firstname: "Władysław",
      lastname: "Kowalski",
      password: "admin",
    },
    {
      email: "paulina@nowak.com",
      firstname: "Paulina",
      lastname: "Nowak",
      password: "admin",
    },
    {
      email: "anna@skalar.com",
      firstname: "Anna",
      lastname: "Skalar",
      password: "admin",
    },
    {
      email: "zbigniew@suska.com",
      firstname: "Zbigniew",
      lastname: "Suska",
      password: "admin",
    },
  ];

  // const user = User.build({ email, firstname, lastname, password });
  let createdUsers = users.map((user: any) => {
    let { email, firstname, lastname, password } = user;
    return User.build({ email, firstname, lastname, password });
  });

  //   console.log("to jest createdUsers", createdUsers);

  createdUsers.map(async (user: any) => {
    await user.save();
  });

  createdUsers.map(async (user: any) => {
    await new UserCreatedPublisher(natsWrapper.client).publish({
      _id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      version: user.version,
    });
  });
};

export default populate;
