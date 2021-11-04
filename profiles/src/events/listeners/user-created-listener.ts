import { Message } from "node-nats-streaming";
import { Subjects, Listener, UserCreatedEvent } from "@conviera/common";
import { User, UserDoc } from "../../models/user";

import { Profile } from "../../models/profile";

//populate
const randomValue = (array: any) => {
  let random = Math.floor(Math.random() * array.length);
  return array[random];
};

const populateMany = (array: any, number: number) => {
  for (let i = 0; i < number; i++) {
    let populated = randomValue(array);
    return populated;
  }
};

const academicTitleArray = [
  "Adjunct Professor",
  "Visiting Professor",
  "Clinical Professor",
  "Research Professor",
  "Research Engineer",
];

const professionArray = [
  "Aeronautical engineer",
  "Electrical engineer",
  "Engineering technologist",
  "Biomedical engineer",
  "Mechanical engineer",
];

const schoolArray = [
  "Harvard University",
  "Massachusetts Institute of Technology",
  "University of Oxford",
  "University of Cambridge",
  "Opole University of Technology",
];

const birthdayArray = [
  "1978.04.07",
  "1989.07.15",
  "1967.12.29",
  "1990.01.13",
  "1956.06.22",
];

const ageArray = [56, 68, 39, 49, 78];

const aboutArray = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet, comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
];

const publicationsArray = [
  {
    title: "Paracetamol: A Focus on Dogs",
    description:
      "A more detailed summary is given in the last part (1/4th) of the Introduction. An anomalous period is in progress, characterized by a very intense release of endogenous energy from the Earth. The cause is an ongoing heartbeat of the Earth’s electrocardiogram. Humankind’s history spans a much shorter duration. Hence, at present the humans are going to face an unprecedented challenge, maybe even concerning survival. The duration of the climate anomaly of an Earth’s heartbeat is a few Ma.",
    time: "14 July 2021",
    doi: "https://doi.org/10.3844/ajeassp.2021.258.291",
  },
  {
    title:
      "Climate Change-An Unprecedented Challenge for Humankind Survival; Energy Exploitation from the Atmospheric Electrical Circuit",
    description:
      "Paracetamol (APAP) is an aniline analgesic, antipyretic and non-narcotic. It is an essential drug, widely used in human medicine. In veterinary medicine it has an extra label use in many countries. It is used exclusively in some animals, including dogs. ",
    time: "12 March 2021",
    doi: "https://doi.org/10.3844/ajavsp.2021.247.262",
  },
  {
    title: "Improve the Consumption of Cement and Sand in Massive Concrete",
    description:
      "The massive concretemixing plan is very important due to its large volume of use in concrete dams.Productivity can be increased in dam manufacturing industry by adopting asuitable method for mixing mass concrete that can meet design, executive andeconomic needs.",
    time: "19 October 2019",
    doi: "https://doi.org/10.3844/ajeassp.2021.409.429",
  },
  {
    title:
      "Investigating the Effect of Intangible Factors (Human, Communication, Organizational, Information) on Brand Equity Case Study: Hotels in Isfahan",
    description:
      "The purpose of this study is to investigate the effect of evaluating the intangible factors (Human, Communication, Organizational and Information) on brand equity in hotels in Isfahan. A based research model was presented as the literature. The questionnaire of 24 items was conducted for this research and a sample of 130 executives and experts of hotels in Isfahan as a statistical society, was selected. The method of this research is applied in terms of objective and descriptive survey method from field branch. The reliability of the questionnaire was based on the original sample (α = 0.81) and the return rate of the questionnaire was 0.84. Meanwhile, using the PLS software, the model was tested.",
    time: "17 June 2018 ",
    doi: "https://doi.org/10.3844/ajeassp.2021.430.435",
  },
  {
    title: "Adverse Drug Reaction Detection Using Latent Semantic Analysis",
    description:
      "Detecting Adverse Drug Reactions (ADRs) is one of the important information for determining the view of the patient on one drug. Most studies have investigated the extraction of ADRs from social networks, in which users share their opinion on a particular medication. Some studies have used trigger terms to detect ADRs.",
    time: "23 May 2021",
    doi: "https://doi.org/10.3844/jcssp.2021.960.970",
  },
  {
    title: "Biodiesel Fuel Production from Algae as Renewable Energy",
    description:
      "Biodiesel is biodegradable, less CO2 and NOx emissions. Continuous use of petroleum sourced fuels is now widely recognized as unsustainable because of depleting supplies and the contribution of these fuels to the accumulation of carbon dioxide in the environment.",
    time: "18 December 2007 ",
    doi: "https://doi.org/10.3844/ajbbsp.2008.250.254",
  },
];
//
//end of populate
//
export class UserCreatedListener extends Listener<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
  queueGroupName = "profiles-service";

  async onMessage(data: UserCreatedEvent["data"], msg: Message) {
    const { _id, firstname, lastname, email } = data;
    const user = User.build({
      _id: _id,
      email: email,
      lastname: lastname,
      firstname: firstname,
    });
    await user.save();

    const profile = await Profile.build({
      _id: _id,
      user: user,
      age: randomValue(ageArray),
      birthdate: randomValue(birthdayArray),
      aboutMe: randomValue(aboutArray),
      profilePhoto:
        "https://meetbe-images.s3.eu-central-1.amazonaws.com/profilePhotos/profile.jpg",
      createdAt: new Date(Date.now()),
      publications: [populateMany(publicationsArray, 3)],
      conferences: [],
      contacts: [],
      events: [],
      posts: [],
      comments: [],
      notifications: [],
      academicTitle: randomValue(academicTitleArray),
      school: randomValue(schoolArray),
      profession: randomValue(professionArray),
      phoneNumber: "123456789",
    });
    await profile.save();
    // console.log(user);
    console.log(profile);
    msg.ack();
  }
}
