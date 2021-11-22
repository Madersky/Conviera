import Link from "next/link";

import UsersList from "../../../components/profiles/userList/UserList";

const ConferenceAdminPanel = ({
  conference,
  role,
  isApplicant,
  profiles,
  currentUser,
}) => {
  if (currentUser._id != conference.creator._id) {
    return (
      <div>
        <h1>You do not have acces to that page</h1>
      </div>
    );
  } else
    return (
      <div className="conference">
        <div className="conference__dashboard--left">
          <div className="conference__info">
            <div className="conference__info-header">
              <h1>{conference.name}</h1>
            </div>
            <h1>{role}</h1>
            <div>
              {conference.creator.firstname} {conference.creator.lastname}
            </div>
          </div>
        </div>
        <div className="conference__dashboard--right">
          <div>
            <UsersList users={profiles} headerText="Applicants" />
            {/* {conference.applicants.map((applicant) => {
                return (
                  <div key={applicant.user._id}>{applicant.user.firstname}</div>
                );
              })} */}
          </div>
        </div>
      </div>
    );
};

ConferenceAdminPanel.getInitialProps = async (context, client, currentUser) => {
  // const responses = [conferenceRes, profilesRes];
  // const requestUrls = [ `/api/conferences/id/${context.query.conferenceId}`]

  const conferenceRes = await client.get(
    `/api/conferences/id/${context.query.conferenceId}`
  );
  const conference = conferenceRes.data.conference;
  //   console.log("to jest console log", conference);
  const profilesRes = await Promise.all(
    conference.applicants.map((applicant) => {
      //   console.log(applicant.user._id);
      return client.get(`/api/profiles/id/${applicant.user._id}`);
    })
  );

  let profiles = profilesRes.map((profile) => {
    return profile.data.profile;
  });

  //   console.log(profiles);
  return {
    ...conferenceRes.data,
    profiles,
    currentUser,
  };
};

export default ConferenceAdminPanel;
