import { Message } from "node-nats-streaming";

import { Listener, Subjects, UserCreatedEvent } from "@conviera/common";
import { User } from "../../models/user";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
  queueGroupName = "speeches-service";
  async onMessage(data: UserCreatedEvent["data"], msg: Message) {
    const userData = data;
    const user = await User.build(userData);
    await user.save();

    msg.ack();
  }
}
