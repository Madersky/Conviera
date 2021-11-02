import { Subjects, UserUpdatedEvent, Publisher } from "@conviera/common";

export class UserUpdatedPublisher extends Publisher<UserUpdatedEvent> {
  readonly subject = Subjects.UserUpdated;
}
