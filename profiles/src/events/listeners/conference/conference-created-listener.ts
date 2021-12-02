import { Message } from "node-nats-streaming";
import { Subjects, Listener, ConferenceCreatedEvent } from "@conviera/common";

import { Profile } from "../../../models/profile";
import { Conference } from "../../../models/conference";

export class ConferenceCreatedlistener extends Listener<ConferenceCreatedEvent> {
  readonly subject = Subjects.ConferenceCreated;
  queueGroupName = "profiles-service";

  async onMessage(data: ConferenceCreatedEvent["data"], msg: Message) {
    const conferenceData = data;

    const conference = Conference.build(conferenceData);

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

    await profile.save();

    msg.ack();
  }
}
