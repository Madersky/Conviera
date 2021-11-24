import { Subjects, Publisher, ApplicationCreatedEvent } from "@conviera/common";

export class ApplicationCreatedPublisher extends Publisher<ApplicationCreatedEvent> {
  readonly subject = Subjects.ApplicationCreated;
}
