import { Message } from "node-nats-streaming";
import { Listener, Subjects, UserCreatedEvent } from "@conviera/common";

import { User } from "../../models/user";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
  queueGroupName = "conferences-service";

  async onMessage(data: UserCreatedEvent["data"], msg: Message) {
    const { _id, firstname, lastname, email } = data;
    const user = User.build({
      _id: _id,
      email: email,
      lastname: lastname,
      firstname: firstname,
    });
    await user.save();

    msg.ack();
  }
}
