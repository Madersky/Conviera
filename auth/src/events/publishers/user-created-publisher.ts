import { Subjects, UserCreatedEvent, Publisher } from "@conviera/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
}
