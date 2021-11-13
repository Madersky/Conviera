import { Subjects, Publisher, ConferenceCreatedEvent } from "@conviera/common";

export class ConferenceCreatedPublisher extends Publisher<ConferenceCreatedEvent> {
  readonly subject = Subjects.ConferenceCreated;
}
