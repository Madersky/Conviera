import UsersList from "../../../components/profiles/userList/UserList";

const ConferenceAdminPanel = ({
  conference,
  role,
  isApplicant,
  profiles,
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
        </div>
      </div>
    </div>
  );
};

ConferenceAdminPanel.getInitialProps = async (context, client, currentUser) => {
  const conferenceRes = await client.get(
    `/api/conferences/id/${context.query.conferenceId}`
  );
  const conference = conferenceRes.data.conference;

  console.log(conference);
  const profilesRes = await Promise.all(
    conference.applications.map((application) => {
      console.log(application);
      return client.get(`/api/profiles/id/${application.user}`);
    })
  );

  let profiles = profilesRes.map((profile) => {
    return profile.data.profile;
  });

  return {
    ...conferenceRes.data,
    profiles,
    currentUser,
  };
};

export default ConferenceAdminPanel;
