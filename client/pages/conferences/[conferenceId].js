import Link from "next/link";
import UsersList from "../../components/profiles/userList/UserList";

const Conference = ({
  conference,
  role,
  isApplicant,
  profiles,
  currentUser,
}) => {
  return (
    <div className="conference">
      <div className="conference__dashboard--left">
        {role === "creator" ? (
          <Link href={`${conference._id}/admin`}>
            <button>admin panel</button>
          </Link>
        ) : (
          ""
        )}

        <div className="conference__info">
          <div className="conference__info-header">
            <h1>{conference.name}</h1>
            {isApplicant === false && role === "none" ? (
              <Link href={`${conference._id}/join`}>
                <button>Join</button>
              </Link>
            ) : (
              ""
            )}
          </div>
          <h1>{role}</h1>
          <div>
            {conference.creator.firstname} {conference.creator.lastname}
          </div>
        </div>
        {role != "none" ? <div>Content for participants</div> : ""}
      </div>
      <div className="conference__dashboard--right">
        <div>
          <UsersList users={profiles} headerText="Participants" />
          {/* {profiles.map((profile) => {
            return (
              <div key={profile._id}>
                <img width="50" height="50" src={profile.profilePhoto} />
                <Link href={`/profiles/${profile._id}`}>
                  <a>
                    {profile.user.firstname} {profile.user.lastname}
                  </a>
                </Link>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

Conference.getInitialProps = async (context, client, currentUser) => {
  const conferenceRes = await client.get(
    `/api/conferences/id/${context.query.conferenceId}`
  );
  const conference = conferenceRes.data.conference;

  const profilesRes = await Promise.all(
    conference.participants.map((participant) => {
      return client.get(`/api/profiles/id/${participant.user._id}`);
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

export default Conference;
