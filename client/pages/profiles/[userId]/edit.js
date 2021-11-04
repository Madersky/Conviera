import React from "react";
import { useState } from "react";
import Router from "next/router";
import Link from "next/dist/client/link";

import useRequest from "../../../hooks/use-request";
import CustomInput from "../../../components/CustomInput";
import PublicationsEdit from "../../../components/profiles/publications/PublicationsEdit";

const ProfileEdit = ({ profile, currentUser }) => {
  const [age, setAge] = useState("");
  const [school, setSchool] = useState("");
  const [academicTitle, setAcademicTitle] = useState("");
  const [birthdate, setBirthdate] = useState(profile.birthdate);
  const [aboutMe, setAboutMe] = useState("");
  const [profession, setProfession] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validationErrorsFields, setValidationErrorsFields] = useState([]);

  const [patchProfileRequest, patchProfilesErrors] = useRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: "patch",
    body: {
      age: age || profile.age,
      school: school || profile.school,
      birthdate: birthdate || profile.birthdate,
      academicTitle: academicTitle || profile.academicTitle,
      aboutMe: aboutMe || profile.aboutMe,
      profession: profession || profile.profession,
      phoneNumber: phoneNumber || profile.phoneNumber,
    },
    onSuccess: () => {
      console.log("profile updated");
      Router.reload();
    },
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    patchProfileRequest();
  };
  return (
    <div className="edit-profile">
      <div className="edit-profile__close">
        <Link href={`/profiles/${currentUser._id}`}>
          <i className="bx bx-x edit-profile__close-icon"></i>
        </Link>
      </div>
      <form className="edit-profile__form" onSubmit={onSubmit}>
        <div className="edit-profile__form-section--top">
          <div className="edit-profile__form-section">
            <h4 className="edit-profile__form-section-header">
              Personal information
            </h4>
            <div className="edit-profile__form-section-content">
              <CustomInput
                name="Age"
                id="age"
                type="text"
                className="custom-input__instance"
                value={age}
                setter={setAge}
                placeholder="18"
                error={
                  patchProfilesErrors && patchProfilesErrors.message["age"]
                }
                iClass="bx bx-heart"
              />
              <CustomInput
                name="Birthdate"
                id="birthdate"
                type="date"
                className="custom-input__instance"
                value={birthdate}
                setter={setBirthdate}
                placeholder="05.09.1999"
                error={
                  patchProfilesErrors &&
                  patchProfilesErrors.message["birthdate"]
                }
                iClass="bx bx-cake"
              />
              <CustomInput
                name="About me"
                id="aboutMe"
                type="text"
                className="custom-input__instance"
                value={aboutMe}
                setter={setAboutMe}
                placeholder="Hello im fullstack DEV"
                error={
                  patchProfilesErrors && patchProfilesErrors.message["aboutMe"]
                }
                iClass="bx bx-notepad"
              />
            </div>
          </div>
          <div className="edit-profile__form-section">
            <h4 className="edit-profile__form-section-header">
              Education and profession
            </h4>
            <div className="edit-profile__form-section-content">
              <CustomInput
                name="School"
                id="school"
                type="text"
                className="custom-input__instance"
                value={school}
                setter={setSchool}
                placeholder="University"
                error={
                  patchProfilesErrors && patchProfilesErrors.message["school"]
                }
                iClass="bx bxs-school"
              />
              <CustomInput
                name="Academic Title"
                id="academicTitle"
                type="text"
                className="custom-input__instance"
                value={academicTitle}
                setter={setAcademicTitle}
                placeholder="Professor"
                error={
                  patchProfilesErrors &&
                  patchProfilesErrors.message["academicTitle"]
                }
                iClass="bx bxs-graduation"
              />
              <CustomInput
                name="Profession"
                id="profession"
                type="text"
                className="custom-input__instance"
                value={profession}
                setter={setProfession}
                placeholder="Programista"
                error={
                  patchProfilesErrors &&
                  patchProfilesErrors.message["profession"]
                }
                iClass="bx bx-briefcase"
              />
            </div>
          </div>
          <div className="edit-profile__form-section">
            <h4 className="edit-profile__form-section-header">Contact</h4>
            <div className="edit-profile__form-section-content">
              <CustomInput
                name="Phone Number"
                id="phoneNumber"
                type="text"
                className="custom-input__instance"
                value={phoneNumber}
                setter={setPhoneNumber}
                placeholder="999999999"
                error={
                  patchProfilesErrors &&
                  patchProfilesErrors.message["phoneNumber"]
                }
                iClass="bx bx-phone"
              />
            </div>
          </div>
        </div>
        <button className="btn btn-primary text-center">Click to edit</button>
      </form>
      <div className="edit-profile__publications">
        <div className="edit-profile__publications-section">
          <div className="edit-profile__publications-section-content">
            <PublicationsEdit
              publications={profile.publications}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileEdit.getInitialProps = async (context, client, currentUser) => {
  const profileRes = await client.get(
    `api/profiles/id/${context.query.userId}`
  );

  return {
    ...profileRes.data,
    currentUser,
  };
};

export default ProfileEdit;
