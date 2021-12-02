import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  ApplicationUpdatedEvent,
  NotFoundError,
  ApplicationStatus,
} from "@conviera/common";

import { Application } from "../../models/application";
import { Conference } from "../../models/conferenceModel";
import { ConferenceUpdatedPublisher } from "../publishers/conference-updated-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class ApplicationUpdatedListener extends Listener<ApplicationUpdatedEvent> {
  readonly subject = Subjects.ApplicationUpdated;
  queueGroupName = "conferences-service";
  async onMessage(data: ApplicationUpdatedEvent["data"], msg: Message) {
    const application = await Application.findOne({
      _id: data._id,
      version: data.version - 1,
    });
    if (!application) {
      throw new Error("Application not found");
    }

    application.set({ status: data.status });

    const conference = await Conference.findById(application.conference);
    if (!conference) {
      throw new Error("Conference not found");
    }

    if (application.status === ApplicationStatus.Accepted) {
      if (
        !!conference.participants.find((participant) => {
          participant.user === application.user;
        })
      ) {
        throw new Error("ERROR !! User is  already a participant");
      } else {
        conference.participants.push({
          user: application.user,
          role: application.role,
        });
      }
    }
    await application.save();
    await conference.save();

    new ConferenceUpdatedPublisher(natsWrapper.client).publish(conference);

    msg.ack();
  }
}
