import { Subjects, UserCreatedEvent, Publisher } from '@meetbe/common';

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
}
