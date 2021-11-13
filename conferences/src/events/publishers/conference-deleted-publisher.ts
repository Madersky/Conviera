import { Subjects, Publisher, ConferenceDeletedEvent } from "@conviera/common";

export class ConferenceDeletedPublisher extends Publisher<ConferenceDeletedEvent> {
  readonly subject = Subjects.ConferenceDeleted;
}
