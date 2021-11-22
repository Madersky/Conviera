import { Message } from "node-nats-streaming";
import { Subjects, Listener, ConferenceCreatedEvent } from "@conviera/common";
import { User } from "../../../models/user";
import { Profile } from "../../../models/profile";
import { Conference } from "../../../models/conference";

export class ConferenceCreatedlistener extends Listener<ConferenceCreatedEvent> {
  readonly subject = Subjects.ConferenceCreated;
  queueGroupName = "conference-service";

  async onMessage(data: ConferenceCreatedEvent["data"], msg: Message) {
    const conferenceData = data;

    const conference = Conference.build(conferenceData);
    console.log(conference);
    await conference.save();

    const profile = await Profile.findByIdAndUpdate(
      conference.creator._id,
      { $addToSet: { conferences: conference } },
      {
        new: true,
      }
    );

    if (!profile) {
      throw new Error("Profile not found!");
    }
    console.log(
      "WYKONUJE SIE LISTENER Z CONFERENCE CREATED W SERWISIE PROFILE"
    );
    await profile.save();

    msg.ack();
  }
}
