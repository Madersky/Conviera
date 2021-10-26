import { Message } from 'node-nats-streaming';
import { Listener, UserUpdatedEvent, Subjects } from '@meetbe/common';
import { User } from '../../models/user';

// DZIALA, ZMIENIC POD APLIKACJE
export class UserUpdatedListener extends Listener<UserUpdatedEvent> {
  readonly subject = Subjects.UserUpdated;
  queueGroupName = 'profiles-service';

  async onMessage(data: UserUpdatedEvent['data'], msg: Message) {
    const { firstname, email, lastname, _id, version } = data;
    const user = await User.findOne({ _id: _id, version: version - 1 });

    if (!user) {
      throw new Error('User not found' + version);
    }

    user.set({ firstname, lastname, email });
    await user.save();

    console.log(`Listener ${user}`);

    msg.ack();
  }
}
