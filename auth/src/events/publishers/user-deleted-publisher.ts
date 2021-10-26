import { Subjects, UserDeletedEvent, Publisher } from '@meetbe/common';

export class UserDeletedPublisher extends Publisher<UserDeletedEvent> {
  readonly subject = Subjects.UserDeleted;
}
