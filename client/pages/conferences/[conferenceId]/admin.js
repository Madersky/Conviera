import UsersList from "../../../components/profiles/userList/UserList";

import ApplicationList from "../../../components/applications/applicationList";

const ConferenceAdminPanel = ({
  conference,
  role,
  isApplicant,

  currentUser,
}) => {
  // if (currentUser._id != conference.creator._id) {
  //   return (
  //     <div>
  //       <h1>You do not have acces to that page</h1>
  //     </div>
  //   );
  // } else
  return (
    <div className="conference">
      <div className="conference__dashboard--left">
        <div className="conference__info">
          <div>
            <ApplicationList
              applications={conference.applications}
              conference={conference}
            />
          </div>
        </div>
      </div>
      <div className="conference__dashboard--right">
        <div>{/* <UsersList headerText="Applicants" /> */}</div>
      </div>
    </div>
  );
};

ConferenceAdminPanel.getInitialProps = async (context, client, currentUser) => {
  const conferenceRes = await client.get(
    `/api/conferences/id/${context.query.conferenceId}`
  );
  const conference = conferenceRes.data.conference;

  // const profilesRes = await Promise.all(
  //   conference.applications.map((application) => {
  //     return client.get(`/api/profiles/id/${application.user._id}`);
  //   })
  // );

  // let profiles = profilesRes.map((profile) => {
  //   return profile.data.profile;
  // });

  return {
    ...conferenceRes.data,
    // profiles,
    currentUser,
  };
};

export default ConferenceAdminPanel;
