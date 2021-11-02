import React, { useState } from "react";

const Details = ({ profile }) => {
  return (
    <div className="details">
      <div className="details__content">
        <section className="details__info">
          <p>School: {profile.school}</p>
          <p>Job: {profile.profession}</p>
        </section>
      </div>
    </div>
  );
};

export default Details;
