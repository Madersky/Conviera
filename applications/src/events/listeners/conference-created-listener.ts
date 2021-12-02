import { Message } from "node-nats-streaming";

import { Listener, Subjects, ConferenceCreatedEvent } from "@conviera/common";
import { Conference } from "../../models/conference";

export class ConferenceCreatedlistener extends Listener<ConferenceCreatedEvent> {
  readonly subject = Subjects.ConferenceCreated;
  queueGroupName = "applications-service";
  async onMessage(data: ConferenceCreatedEvent["data"], msg: Message) {
    const conferenceData = data;
    const conference = await Conference.build(conferenceData);
    await conference.save();

    msg.ack();
  }
}
