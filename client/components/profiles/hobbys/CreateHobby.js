import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import useRequest from '../../../hooks/use-request';
import CustomInput from '../../CustomInput';

const CreateHobby = ({
  showCreateHobby,
  setShowCreateHobby,
  currentUser,
  setActiveHobbys,
  activeHobbys,
}) => {
  const [hobby, setHobby] = useState('');
  const [patchProfileHobbyRequest, patchProfilesHobbyErrors] = useRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'patch',
    body: {
      hobby: hobby,
    },
    onSuccess: () => {
      console.log('profile updated, hobby created');
    },
  });
  // Case kiedy chcemy wyjść ESC
  //   const isInitialMount = useRef(true);
  //   useEffect(() => {
  //     const handleEsc = (event) => {
  //       if (event.keyCode === 27) {
  //         console.log('elos');
  //         setShowCreateHobby(!showCreateHobby);
  //       }
  //     };
  //     window.addEventListener('keydown', handleEsc);
  //     return () => {
  //       window.removeEventListener('keydown', handleEsc);
  //     };
  //   }, []);
  const addHobby = (e) => {
    e.preventDefault();
    patchProfileHobbyRequest();
    setActiveHobbys([...activeHobbys, hobby]);
    setShowCreateHobby(!showCreateHobby);
    setHobby('');
  };

  const popUp = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  const windowVar = {
    visible: {
      x: 200,
    },
    hidden: {
      x: 400,
    },
  };
  return (
    <AnimatePresence>
      {showCreateHobby && (
        <motion.div
          className="create-hobby"
          variants={popUp}
          animate="visible"
          initial="hidden"
          exit="hidden"
        >
          <motion.form className="create-hobby__form" variants={windowVar}>
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
                patchProfilesHobbyErrors.message['hobby']
              }
            />

            <button
              className="btn btn-primary"
              onClick={addHobby}
              disabled={hobby ? null : 'disabled'}
            >
              Add hobby
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateHobby;
