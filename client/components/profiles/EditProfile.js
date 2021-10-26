import React from 'react';
import { useState, useRef, useEffect } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';
import CustomInput from '../CustomInput';

const EditProfile = ({ profile, currentUser }) => {
  const [age, setAge] = useState('');
  const [school, setSchool] = useState('');
  const [birthdate, setBirthdate] = useState(profile.birthDate);
  const [aboutMe, setAboutMe] = useState('');
  const [hometown, setHometown] = useState('');
  const [profession, setProfession] = useState('');
  const [currentJob, setCurrentJob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [validationErrorsFields, setValidationErrorsFields] = useState([]);

  const [patchProfileRequest, patchProfilesErrors] = useRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'patch',
    body: {
      age: age || profile.age,
      school: school || profile.school,
      birthdate: birthdate || profile.birthdate,
      aboutMe: aboutMe || profile.aboutMe,
      hometown: hometown || profile.hometown,
      profession: profession || profile.profession,
      currentJob: currentJob || profile.currentJob,
      phoneNumber: phoneNumber || profile.phoneNumber,
    },
    onSuccess: () => {
      console.log('profile updated');
      Router.reload();
    },
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    patchProfileRequest();
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <CustomInput
          name="Age"
          id="age"
          type="text"
          className="input-group mb-3"
          value={age}
          setter={setAge}
          placeholder="18"
          error={patchProfilesErrors && patchProfilesErrors.message['age']}
          iClass="bi-heart-fill"
        />
        <CustomInput
          name="School"
          id="school"
          type="text"
          className="input-group mb-3"
          value={school}
          setter={setSchool}
          placeholder="University"
          error={patchProfilesErrors && patchProfilesErrors.message['school']}
          iClass="bi-bookmarks-fill"
        />
        <CustomInput
          name="Birthdate"
          id="birthdate"
          type="date"
          className="input-group mb-3"
          value={birthdate}
          setter={setBirthdate}
          placeholder="05.09.1999"
          error={
            patchProfilesErrors && patchProfilesErrors.message['birthDate']
          }
          iClass="bi-house-fill"
        />
        <CustomInput
          name="About me"
          id="aboutMe"
          type="text"
          className="input-group mb-3"
          value={aboutMe}
          setter={setAboutMe}
          placeholder="Hello im fullstack DEV"
          error={patchProfilesErrors && patchProfilesErrors.message['aboutMe']}
          iClass="bi-textarea-t"
        />
        <CustomInput
          name="Hometown"
          id="hometown"
          type="text"
          className="input-group mb-3"
          value={hometown}
          setter={setHometown}
          placeholder="Brzeg"
          error={patchProfilesErrors && patchProfilesErrors.message['hometown']}
          iClass="bi-house-fill"
        />
        <CustomInput
          name="Profession"
          id="profession"
          type="text"
          className="input-group mb-3"
          value={profession}
          setter={setProfession}
          placeholder="Programista"
          error={
            patchProfilesErrors && patchProfilesErrors.message['profession']
          }
          iClass="bi-briefcase-fill"
        />
        <CustomInput
          name="Current Job"
          id="currentJob"
          type="text"
          className="input-group mb-3"
          value={currentJob}
          setter={setCurrentJob}
          placeholder="Programista fullstack"
          error={
            patchProfilesErrors && patchProfilesErrors.message['currentJob']
          }
          iClass="bi-house-fill"
        />

        <CustomInput
          name="Phone Number"
          id="phoneNumber"
          type="text"
          className="input-group mb-3"
          value={phoneNumber}
          setter={setPhoneNumber}
          placeholder="999999999"
          error={
            patchProfilesErrors && patchProfilesErrors.message['phoneNumber']
          }
          iClass="bi-house-fill"
        />
        <button className="btn btn-primary text-center">Click to edit</button>
      </form>
    </div>
  );
};

export default EditProfile;
