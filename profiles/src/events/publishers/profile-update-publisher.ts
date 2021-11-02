import { Subjects, Publisher, ProfileUpdatedEvent } from "@conviera/common";

export class ProfileUpdatePublisher extends Publisher<ProfileUpdatedEvent> {
  readonly subject = Subjects.ProfileUpdated;
}
