import React, { useState } from "react";
import FileUpload from "../../../../components/applications/fileUpload";
import useRequest from "../../../../hooks/use-request";

const ApplayToConference = ({ currentUser, conference }) => {
  // const [role, setRole] = useState("listener");

  // const [addUserToConferenceRequest, addUserToConferenceError] = useRequest({
  //   url: `/api/conferences/id/${conference._id}/join`,
  //   method: "patch",
  //   body: {
  //     user: currentUser,
  //     role: role,
  //   },
  //   onSucces: () => {
  //     console.log("applicant added successfully");
  //   },
  // });

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   addUserToConferenceRequest();
  // };

  return (
    <div>
      <FileUpload currentUser={currentUser} conference={conference} />
      {/* <form onSubmit={handleFormSubmit}>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>listener</option>
          <option>speaker</option>
        </select>

        <div className="image__form-container">
          <label>
            <input
              className="image__form-submit"
              type="file"
              name="photo"
              accept=".doc,.docx,application/msword, application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              // onChange={onChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

ApplayToConference.getInitialProps = async (context, client, currentUser) => {
  const conferenceRes = await client.get(
    `/api/conferences/id/${context.query.conferenceId}`
  );

  return {
    ...conferenceRes.data,
    currentUser,
  };
};

export default ApplayToConference;
