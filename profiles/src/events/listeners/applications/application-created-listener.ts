import { Message } from "node-nats-streaming";
import { Subjects, Listener, ApplicationCreatedEvent } from "@conviera/common";

import { ProfileUpdatePublisher } from "../../publishers/profile-update-publisher";

import { Application } from "../../../models/application";
import { Profile } from "../../../models/profile";
import { natsWrapper } from "../../../nats-wrapper";

export class ApplicationCreatedListener extends Listener<ApplicationCreatedEvent> {
  readonly subject = Subjects.ApplicationCreated;
  queueGroupName = "profiles-service";
  async onMessage(data: ApplicationCreatedEvent["data"], msg: Message) {
    const application = Application.build(data);

    await application.save();

    const profile = await Profile.findById(data.user);

    if (!profile) {
      throw new Error(`ERROR !!! profile not found`);
    }
    profile.applications.push(application);

    await profile.save();

    new ProfileUpdatePublisher(natsWrapper.client).publish(profile);

    msg.ack();
  }
}
