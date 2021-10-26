import { Subjects, Publisher, ProfileUpdatedEvent } from '@meetbe/common';

export class ProfileUpdatePublisher extends Publisher<ProfileUpdatedEvent> {
  readonly subject = Subjects.ProfileUpdated;
}
