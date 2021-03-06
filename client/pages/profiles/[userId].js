import { useState } from "react";

import BasicInfo from "../../components/profiles/basicInfo/BasicInfo";
import UserList from "../../components/profiles/userList/UserList";
import Publications from "../../components/profiles/publications/Publications";

const Profile = ({ profile, currentUser }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="profile">
      <div className="profile__container--left-side">
        <div className="profile__basic-info">
          <BasicInfo profile={profile} currentUser={currentUser} />
        </div>

        <div className="profile__about">
          <h2>About me</h2>
          <p>{profile.aboutMe}</p>
        </div>
        {/* <div className="profile__hobbys">
          <Hobbys hobbys={hobbys} currentUser={currentUser} />{' '}
        </div> */}
        <div className="profile__posts"></div>
      </div>
      <div className="profile__container--right-side">
        <div className="profile__publications">
          <Publications publications={profile.publications} />
        </div>
        {/* <div className="profile__contacts">
          <Contacts contacts={profile.contacts} />
        </div> */}
        {/* <div className="profile__experience"> */}
        {/* <CustomExperience
            experiences={profile.experiences}
            currentUser={currentUser}
          /> */}
        {/* <Experience
            experiences={profile.experiences}
            currentUser={currentUser}
          /> */}
        {/* </div> */}

        {/* <div className="profile__edit-profile">
          <EditProfile profile={profile} currentUser={currentUser} />{' '}
        </div> */}
      </div>
    </div>
  );
};

Profile.getInitialProps = async (context, client, currentUser) => {
  const profileRes = await client.get(
    `api/profiles/id/${context.query.userId}`
  );

  return {
    ...profileRes.data,
    currentUser,
  };
};

export default Profile;
