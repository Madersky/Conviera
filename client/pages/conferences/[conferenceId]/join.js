import React, { useState } from "react";
import useRequest from "../../../hooks/use-request";

const JoinConference = ({ currentUser, conference }) => {
  const [role, setRole] = useState("listener");

  const [addUserToConferenceRequest, addUserToConferenceError] = useRequest({
    url: `/api/conferences/id/${conference._id}/join`,
    method: "patch",
    body: {
      user: currentUser,
      role: role,
    },
    onSucces: () => {
      console.log("applicant added successfully");
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addUserToConferenceRequest();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>listener</option>
          <option>speaker</option>
        </select>
        <button type="submit"></button>
      </form>
    </div>
  );
};

JoinConference.getInitialProps = async (context, client, currentUser) => {
  const conferenceRes = await client.get(
    `/api/conferences/id/${context.query.conferenceId}`
  );

  return {
    ...conferenceRes.data,
    currentUser,
  };
};

export default JoinConference;
