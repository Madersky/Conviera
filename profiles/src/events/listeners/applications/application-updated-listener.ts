import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  ApplicationUpdatedEvent,
  NotFoundError,
  ApplicationStatus,
} from "@conviera/common";

import { Application } from "../../../models/application";

export class ApplicationUpdatedListener extends Listener<ApplicationUpdatedEvent> {
  readonly subject = Subjects.ApplicationUpdated;
  queueGroupName = "profiles-service";
  async onMessage(data: ApplicationUpdatedEvent["data"], msg: Message) {
    const application = await Application.findOne({
      _id: data._id,
      version: data.version - 1,
    });

    if (!application) {
      throw new Error("Application not found");
    }

    application.set({ status: data.status });

    await application.save();

    msg.ack();
  }
}
