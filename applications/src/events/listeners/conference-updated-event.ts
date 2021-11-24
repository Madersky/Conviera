import { Message } from "node-nats-streaming";

import { Listener, Subjects, ConferenceUpdatedEvent } from "@conviera/common";
import { Conference } from "../../models/conference";

export class ConferenceUpdatedlistener extends Listener<ConferenceUpdatedEvent> {
  readonly subject = Subjects.ConferenceUpdated;
  queueGroupName = "applications-service";
  async onMessage(data: ConferenceUpdatedEvent["data"], msg: Message) {
    const conferenceData = data;
    // let conference = await Conference.findById(conferenceData._id);

    const conference = await Conference.findByIdAndUpdate(
      conferenceData._id,
      data
    );
    if (!conference) {
      throw new Error("Profile not found");
    }
    await conference.save();

    console.log(
      "WYKONUJE SIE LISTENER Z CONFERENCE CREATED W SERWISIE APPLICATIONS"
    );

    msg.ack();
  }
}
