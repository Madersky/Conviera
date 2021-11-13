import React, { useState } from "react";

import CreateConference from "../../components/conferences/CreateConference";

const newConference = ({ currentUser }) => {
  return <CreateConference currentUser={currentUser} />;
};
newConference.getInitialProps = async (context, client, currentUser) => {
  return {
    currentUser,
  };
};

export default newConference;
