import { Subjects, UserDeletedEvent, Publisher } from "@conviera/common";

export class UserDeletedPublisher extends Publisher<UserDeletedEvent> {
  readonly subject = Subjects.UserDeleted;
}
