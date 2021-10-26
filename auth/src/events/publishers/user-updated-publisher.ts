import { Subjects, UserUpdatedEvent, Publisher } from '@meetbe/common';

export class UserUpdatedPublisher extends Publisher<UserUpdatedEvent> {
  readonly subject = Subjects.UserUpdated;
}
