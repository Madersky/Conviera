import { Subjects, Publisher, ConferenceUpdatedEvent } from "@conviera/common";

export class ConferenceUpdatedPublisher extends Publisher<ConferenceUpdatedEvent> {
  readonly subject = Subjects.ConferenceUpdated;
}
