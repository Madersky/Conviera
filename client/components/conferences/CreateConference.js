import React from "react";
import { useState } from "react";

import useRequest from "../../hooks/use-request";
import CustomInput from "../../components/CustomInput";

const CreateConference = ({ currentUser }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [registrationStartDate, setRegistrationStartDate] = useState("");
  const [registrationEndDate, setRegistrationEndDate] = useState("");
  const [conferenceStartDate, setConferenceStartDate] = useState("");
  const [conferenceEndDate, setConferenceEndDate] = useState("");

  const [mode, setMode] = useState("");
  const [conferenceCountry, setConferenceCountry] = useState("");
  const [conferenceVenue, setConferenceVenue] = useState("");
  const [conferenceCity, setConferenceCity] = useState("");
  const [conferenceStreet, setConferenceStreet] = useState([]);
  const [conferenceProvince, setConferenceProvince] = useState("");

  const [discipline, setDiscipline] = useState("");
  const [keywords, setKeywords] = useState("");
  const [organizers, setOrganizers] = useState("");

  const [cost, setCost] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSite, setContactSite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [createConferenceRequest, createConferenceErrors] = useRequest({
    url: `/api/conferences/create`,
    method: "post",
    body: {
      creator: {
        _id: currentUser._id,
        email: currentUser.email,
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
      },
      name: name,
      description: description,
      registrationStartDate: registrationStartDate,
      registrationEndDate: registrationEndDate,
      conferenceStartDate: conferenceStartDate,
      conferenceEndDate: conferenceEndDate,
      mode: mode,
      conferenceCountry: conferenceCountry,
      conferenceCity: conferenceCity,
      conferenceStreet: conferenceStreet,
      conferenceProvince: conferenceProvince,
      discipline: discipline,
      keywords: keywords,
      organizers: organizers,
      cost: cost,
      contactEmail: contactEmail,
      contactSite: contactSite,
      phoneNumber: phoneNumber,
    },
    onSuccess: () => {
      console.log("Conference created");
      // Router.reload();
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    createConferenceRequest();
  };

  return (
    <div className="new-conference">
      <form className="new-conference__form" onSubmit={onSubmit}>
        <div className="new-conference__form-section">
          <h4 className="new-conference__form-section-header">
            Conference information
          </h4>
          <div className="new-conference__form-section-content">
            <CustomInput
              name="Name"
              id="name"
              type="text"
              className="custom-input__instance"
              value={name}
              setter={setName}
              placeholder="National pharmacy conference"
              error={
                createConferenceErrors && createConferenceErrors.message["name"]
              }
              iClass="bx bx-edit-alt"
            />

            <CustomInput
              name="Organizers"
              id="organizers"
              type="text"
              className="custom-input__instance"
              value={organizers}
              setter={setOrganizers}
              placeholder="Opole University of Technology"
              error={
                createConferenceErrors &&
                createConferenceErrors.message["organizers"]
              }
              iClass="bx bx-group"
            />
            <CustomInput
              name="Cost"
              id="cost"
              type="text"
              className="custom-input__instance"
              value={cost}
              setter={setCost}
              placeholder="100 Euro"
              error={
                createConferenceErrors && createConferenceErrors.message["cost"]
              }
              iClass="bx bx-dollar-circle"
            />

            <CustomInput
              name="Keywords"
              id="keywords"
              type="text"
              className="custom-input__instance"
              value={keywords}
              setter={setKeywords}
              placeholder=""
              error={
                createConferenceErrors &&
                createConferenceErrors.message["keywords"]
              }
              iClass="bx bx-key"
            />
            <div style={{ paddingBottom: "15px" }}>
              <label>Conference discipline</label>
              <div>
                <i className="bx bx-notepad"></i>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                >
                  <option>All disciplines</option>
                  <optgroup label="IT">
                    <option>IT Engineering</option>
                    <option>Software Development</option>
                    <option>Software Architecture</option>
                  </optgroup>
                  <optgroup label="Biology">
                    <option>Kardiology</option>
                    <option>Pharmacy</option>
                    <option>Dentistry</option>
                  </optgroup>
                </select>
              </div>
            </div>
            <div>
              <label>
                <p>Description</p>
              </label>
              <textarea
                id="description"
                style={{ width: "100%", margin: "0", resize: "none" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                placeholder="Hello im fullstack DEV"
                error={
                  createConferenceErrors &&
                  createConferenceErrors.message["description"]
                }
              ></textarea>
            </div>
          </div>
        </div>
        <div className="new-conference__form-section">
          <h4 className="new-conference__form-section-header">
            Conference date
          </h4>
          <div className="new-conference__form-section-content">
            <CustomInput
              name="Registration start"
              id="registrationStartDate"
              type="date"
              className="custom-input__instance"
              value={registrationStartDate}
              setter={setRegistrationStartDate}
              error={
                createConferenceErrors &&
                createConferenceErrors.message["registrationStartDate"]
              }
              iClass="bx bx-calendar-plus"
            />
            <CustomInput
              name="Registration end"
              id="registrationEndDate"
              type="date"
              className="custom-input__instance"
              value={registrationEndDate}
              setter={setRegistrationEndDate}
              error={
                createConferenceErrors &&
                createConferenceErrors.message["registrationEndDate"]
              }
              iClass="bx bx-calendar-event"
            />
            <CustomInput
              name="Conference start"
              id="conferenceStartDate"
              type="date"
              className="custom-input__instance"
              value={conferenceStartDate}
              setter={setConferenceStartDate}
              error={
                createConferenceErrors &&
                createConferenceErrors.message["conferenceStartDate"]
              }
              iClass="bx bx-calendar-minus"
            />
            <CustomInput
              name="Conference end"
              id="conferenceEndDate"
              type="date"
              className="custom-input__instance"
              value={conferenceEndDate}
              setter={setConferenceEndDate}
              error={
                createConferenceErrors &&
                createConferenceErrors.message["conferenceEndDate"]
              }
              iClass="bx bx-calendar-event"
            />
          </div>
        </div>
        <div className="new-conference__form-section">
          <h4 className="new-conference__form-section-header">
            Conference place
          </h4>
          <div className="new-conference__form-section-content">
            <div style={{ paddingBottom: "15px" }}>
              <label>Conference type</label>
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option>Remote</option>
                <option>Stationary</option>
              </select>
            </div>
            <CustomInput
              name="Conference country"
              id="conferenceCountry"
              type="text"
              className="custom-input__instance"
              value={conferenceCountry}
              setter={setConferenceCountry}
              error={
                createConferenceErrors &&
                createConferenceErrors.message["conferenceCountry"]
              }
              iClass="bx bx-map-pin"
            />
            <CustomInput
              name="Conference province"
              id="conferenceProvince"
              type="text"
              className="custom-input__instance"
              value={conferenceProvince}
              setter={setConferenceProvince}
              error={
                createConferenceErrors &&
                createConferenceErrors.message["conferenceProvince"]
              }
              iClass="bx bx-map-pin"
            />
            <CustomInput
              name="Conference city"
              id="conferenceCity"
              type="text"
              className="custom-input__instance"
              value={conferenceCity}
              setter={setConferenceCity}
              error={
                createConferenceErrors &&
                createConferenceErrors.message["conferenceCity"]
              }
              iClass="bx bx-buildings"
            />

            <CustomInput
              name="Conference venue"
              id="conferenceVenue"
              type="text"
              className="custom-input__instance"
              value={conferenceVenue}
              setter={setConferenceVenue}
              error={
                createConferenceErrors &&
                createConferenceErrors.message["conferenceVenue"]
              }
              iClass="bx bx-buildings"
            />
            <CustomInput
              name="Conference street"
              id="conferenceStreet"
              type="text"
              className="custom-input__instance"
              value={conferenceStreet}
              setter={setConferenceStreet}
              error={
                createConferenceErrors &&
                createConferenceErrors.message["conferenceStreet"]
              }
              iClass="bx bxs-map"
            />
          </div>
        </div>
        <div className="new-conference__form-section">
          <h4 className="new-conference__form-section-header">Contact</h4>
          <div className="new-conference__form-section-content">
            <CustomInput
              name="Contact Email"
              id="contactEmail"
              type="text"
              className="custom-input__instance"
              value={contactEmail}
              setter={setContactEmail}
              error={
                createConferenceErrors &&
                createConferenceErrors.message["contactEmail"]
              }
              iClass="bx bx-mail-send"
            />
            <CustomInput
              name="Contact site"
              id="contactSite"
              type="text"
              className="custom-input__instance"
              value={contactSite}
              setter={setContactSite}
              error={
                createConferenceErrors &&
                createConferenceErrors.message["contactSite"]
              }
              iClass="bx bx-desktop"
            />
            <CustomInput
              name="Phone numer"
              id="phoneNumber"
              type="text"
              className="custom-input__instance"
              value={phoneNumber}
              setter={setPhoneNumber}
              error={
                createConferenceErrors &&
                createConferenceErrors.message["phoneNumber"]
              }
              iClass="bx bx-phone-call"
            />
          </div>
        </div>

        <button className="btn btn-primary text-center">Create</button>
      </form>
    </div>
  );
};

export default CreateConference;
