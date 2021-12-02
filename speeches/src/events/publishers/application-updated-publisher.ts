import { Subjects, Publisher, ApplicationUpdatedEvent } from "@conviera/common";

export class ApplicationUpdatedPublisher extends Publisher<ApplicationUpdatedEvent> {
  readonly subject = Subjects.ApplicationUpdated;
}
