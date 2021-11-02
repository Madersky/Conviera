import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import useRequest from "../../../hooks/use-request";
import CustomInput from "../../CustomInput";

const CreateHobby = ({
  showCreateHobby,
  setShowCreateHobby,
  currentUser,
  setActiveHobbys,
  activeHobbys,
}) => {
  const [hobby, setHobby] = useState("");
  const [patchProfileHobbyRequest, patchProfilesHobbyErrors] = useRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: "patch",
    body: {
      hobby: hobby,
    },
    onSuccess: () => {
      console.log("profile updated, hobby created");
    },
  });

  const addHobby = (e) => {
    e.preventDefault();
    patchProfileHobbyRequest();
    setActiveHobbys([...activeHobbys, hobby]);
    setShowCreateHobby(!showCreateHobby);
    setHobby("");
  };

  return (
    <AnimatePresence>
      {showCreateHobby && (
        <div className="create-hobby">
          <form className="create-hobby__form">
            <div className="create-hobby__form__label">Add hobby</div>
            <CustomInput
              name=""
              id="hobbys"
              type="text"
              className="create-hobby__form__input"
              value={hobby}
              setter={setHobby}
              placeholder="Music"
              error={
                patchProfilesHobbyErrors &&
                patchProfilesHobbyErrors.message["hobby"]
              }
            />

            <button
              className="btn btn-primary"
              onClick={addHobby}
              disabled={hobby ? null : "disabled"}
            >
              Add hobby
            </button>
          </form>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateHobby;
