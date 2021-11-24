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

    const profile = await Profile.findByIdAndUpdate(
      application.user._id,
      { $addToSet: { applications: application } },
      { new: true }
    );

    if (profile) {
      await new ProfileUpdatePublisher(natsWrapper.client).publish({
        _id: profile._id,
        ...profile,
      });
    } else {
      throw new Error(`ERROR !!! profile do not exist`);
    }

    await profile.save();

    msg.ack();
  }
}
