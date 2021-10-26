import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';

import { Experience } from '../../components/profiles/experience/Experience';
import EditProfile from '../../components/profiles/EditProfile';
import Hobbys from '../../components/profiles/hobbys/Hobbys';
import BasicInfo from '../../components/profiles/basicInfo/BasicInfo';

const Profile = ({ profile, currentUser }) => {
  const [editMode, setEditMode] = useState(false);

  const hobbys = Array.from(profile.hobbys);

  return (
    <div className="profile">
      <div className="profile__container--left-side">
        <div className="profile__basic-info">
          <BasicInfo profile={profile} currentUser={currentUser} />
        </div>

        <div className="profile__aboutMe">
          <h2>About me!</h2>
          <p>{profile.aboutMe}</p>
        </div>
        <div className="profile__hobbys">
          <Hobbys hobbys={hobbys} currentUser={currentUser} />{' '}
        </div>
        <div className="profile__aboutMe">
          <h4>Phone Number</h4>
          <p>{profile.phoneNumber}</p>
        </div>
      </div>
      <div className="profile__container--right-side">
        <div className="profile__experience">
          {/* <CustomExperience
            experiences={profile.experiences}
            currentUser={currentUser}
          /> */}
          <Experience
            experiences={profile.experiences}
            currentUser={currentUser}
          />
        </div>

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
  // console.log(context.query.userId);
  // console.log('PROFILE RES CONSOLE LOG GET INITIAL PROPS', profileRes.data);

  return {
    ...profileRes.data,
    currentUser,
  };
};

export default Profile;
