import React, { useState } from "react";

const Details = ({ profile }) => {
  return (
    <div className="details">
      <div className="details__content">
        <section className="details__info">
          <div className="details__info-section">
            <p className="details__info-section-paragraph">
              School: {profile.school}
            </p>
            <p className="details__info-section-paragraph">
              Job: {profile.profession}
            </p>
          </div>
          <div className="details__info-section">
            <p className="details__info-section-paragraph">
              Age: {profile.age}
            </p>
            <p className="details__info-section-paragraph--email">
              Birthday: {profile.birthdate}
            </p>
          </div>
          <div className="details__info-section">
            <p className="details__info-section-paragraph">
              Phone number: {profile.phoneNumber}
            </p>
            <p className="details__info-section-paragraph--email">
              e-mail: {profile.user.email}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Details;
