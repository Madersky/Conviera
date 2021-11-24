import { Message } from "node-nats-streaming";
import { Subjects, Listener, ApplicationCreatedEvent } from "@conviera/common";

import { Application } from "../../models/application";
import { Conference } from "../../models/conferenceModel";
import { ConferenceUpdatedPublisher } from "../publishers/conference-updated-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class ApplicationCreatedListener extends Listener<ApplicationCreatedEvent> {
  readonly subject = Subjects.ApplicationCreated;
  queueGroupName = "conferences-service";
  async onMessage(data: ApplicationCreatedEvent["data"], msg: Message) {
    const application = Application.build(data);

    await application.save();

    const conference = await Conference.findByIdAndUpdate(
      application.conference._id,
      { $addToSet: { applications: application } },
      { new: true }
    );

    if (conference) {
      await new ConferenceUpdatedPublisher(natsWrapper.client).publish({
        _id: conference._id,
        ...conference,
      });
      await conference.save();
    }

    msg.ack();
  }
}
