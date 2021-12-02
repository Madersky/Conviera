import { Message } from "node-nats-streaming";

import {
  Listener,
  Subjects,
  ConferenceUpdatedEvent,
  NotFoundError,
} from "@conviera/common";
import { Conference } from "../../models/conference";

export class ConferenceUpdatedlistener extends Listener<ConferenceUpdatedEvent> {
  readonly subject = Subjects.ConferenceUpdated;
  queueGroupName = "applications-service";
  async onMessage(data: ConferenceUpdatedEvent["data"], msg: Message) {
    const conference = await Conference.findOne({
      _id: data._id,
      version: data.version - 1,
    });

    if (!conference) {
      throw new Error("ERROR !! Conference not found");
    }

    conference.set({ ...data, version: data.version - 1 });

    await conference.save();

    msg.ack();
  }
}
