import { Message } from 'node-nats-streaming';
import { Subjects, Listener, UserCreatedEvent } from '@meetbe/common';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
  queueGroupName = 'profiles-service';

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { _id, firstname, lastname, email } = data;
    const user = User.build({
      _id: _id,
      email: email,
      lastname: lastname,
      firstname: firstname,
    });
    await user.save();

    const profile = Profile.build({
      _id: _id,
      user: user,
      // age: null,
      // birthdate: null,
      // aboutMe: null,
      profilePhoto:
        'https://meetbe-images.s3.eu-central-1.amazonaws.com/profilePhotos/profile.jpg',
      createdAt: new Date(Date.now()),
      // hobbys: [],
      // hometown: null,
      // school: null,
      // profession: null,
      // experiences: [{ description: 'Description', title: 'REACT' }],
      // currentJob: null,
      // phoneNumber: null,
    });
    await profile.save();
    console.log(user);
    console.log(profile);
    msg.ack();
  }
}
