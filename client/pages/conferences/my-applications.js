import React from "react";

const MyApplications = ({ applications }) => {
  if (!applications[0])
    return (
      <div>
        <h1>You havent apply for conference</h1>
        <p>Maybe it`s time to applay for conference you want participate</p>
      </div>
    );

  return (
    <div className="applications">
      <div className="applications__labels">
        <p>Conference:</p>
        <p>Attachment:</p>
        <p>status:</p>
      </div>
      {applications.map((application) => {
        return (
          <div key={application._id} className="applications__instance">
            <div className="applications__instance-info">
              <div className="applications__instance-info-name">
                <h4>{application.conference.name}</h4>
              </div>
              <div className="applications__instance-info-attachment">
                <h4>
                  <a href={application.attachments}>
                    <i className="bx bx-file"></i>
                  </a>
                </h4>
              </div>
              <div className="applications__instance-info-status">
                {application.status === "awaiting:acceptance" ? (
                  <h4>Awaiting acceptance</h4>
                ) : (
                  <h4>{application.status}</h4>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

MyApplications.getInitialProps = async (context, client, currentUser) => {
  const applicationsRes = await client.get(
    `/api/applications/user/id/${currentUser._id}`
  );

  return {
    ...applicationsRes.data,
  };
};

export default MyApplications;
