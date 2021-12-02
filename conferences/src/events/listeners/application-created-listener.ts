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

    // const conference = await Conference.findByIdAndUpdate(
    //   application.conference._id,
    //   { $addToSet: { applications: application } },
    //   { new: true }
    // );

    const conference = await Conference.findById(data.conference);

    if (!conference) {
      throw new Error("ERROR !! Conference not found");
    }

    conference.applications.push(application);

    await conference.save();

    new ConferenceUpdatedPublisher(natsWrapper.client).publish(conference);

    msg.ack();
  }
}
