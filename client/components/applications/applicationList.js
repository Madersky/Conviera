import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Link from "next/link";

const ApplicationList = ({ applications, conference, profiles }) => {
  //   if (!applications[0])
  //     return (
  //       <div>
  //         <h1>You havent apply for conference</h1>
  //         <p>Maybe it`s time to applay for conference you want participate</p>
  //       </div>
  //     );
  const [listFilter, setListFilter] = useState("awaiting:acceptance");
  const [status, setStatus] = useState("");
  const [selectedApplicationId, setSelectedApplicationId] = useState("");
  const [manageApplicationRequest, manageApplicationErrors] = useRequest({
    url: `/api/applications/id/${selectedApplicationId}`,
    method: "patch",
    body: {
      _id: selectedApplicationId,
      status: status,
    },
    onSuccess: () => {
      console.log("succesfull application patch");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    manageApplicationRequest();
  };

  const applicationsToRender = applications.filter(
    (application) => application.status === listFilter
  );

  return (
    <div className="applications-list">
      <div className="applications-list__labels">
        <button
          value="awaiting:acceptance"
          onClick={(e) => setListFilter(e.target.value)}
        >
          Awaiting acceptance
        </button>
        <button value="accepted" onClick={(e) => setListFilter(e.target.value)}>
          Accepted
        </button>
        <button value="rejected" onClick={(e) => setListFilter(e.target.value)}>
          Rejected
        </button>
      </div>
      <div className="applications-list__labels">
        <p>Person:</p>
        <p>Role:</p>
        <p>Attachment:</p>
        <p>status:</p>
        <p></p>
      </div>

      {applicationsToRender.map((application) => {
        return (
          <div key={application._id} className="applications-list__instance">
            <div className="applications-list__instance-info">
              <div className="applications-list__instance-info-name">
                <h4>
                  <Link href={`/profiles/${application.user._id}`}>
                    <a>
                      {application.user.firstname} {application.user.lastname}
                    </a>
                  </Link>
                </h4>
              </div>
              <div className="applications-list__instance-info-role">
                <h4>{application.role}</h4>
              </div>
              <div className="applications-list__instance-info-attachment">
                <h4>
                  <a href={application.attachments}>
                    <i className="bx bx-file"></i>
                  </a>
                </h4>
              </div>
              <div className="applications-list__instance-info-status">
                {application.status === "awaiting:acceptance" ? (
                  <h4>Awaiting acceptance</h4>
                ) : (
                  <h4>{application.status}</h4>
                )}
              </div>

              <div className="applications-list__instance-info-action">
                {application.status === "awaiting:acceptance" ? (
                  <form onSubmit={onSubmit}>
                    <button
                      type="submit"
                      value={application._id}
                      onClick={(e) => {
                        setStatus("accepted");
                        setSelectedApplicationId(e.currentTarget.value);
                      }}
                    >
                      <i className="bx bx-check"></i>
                    </button>
                    <button
                      type="submit"
                      value={application._id}
                      onClick={(e) => {
                        setStatus("rejected");
                        setSelectedApplicationId(e.currentTarget.value);
                      }}
                    >
                      <i className="bx bx-x"></i>
                    </button>
                  </form>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationList;
