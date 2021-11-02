import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Details from "./Details";
import ImagePanel from "./ImagePanel";

const BasicInfo = ({ profile, currentUser }) => {
  return (
    <motion.div className="basic-info" transition={{ duration: 1 }}>
      <div className="basic-info__section-photo">
        <ImagePanel
          profile={profile || "profile.jpg"}
          currentUser={currentUser}
        />
      </div>
      <div className="basic-info__section-basic">
        <div className="basic-info__section-basic-edit">
          <i className="bx bx-edit"></i>
        </div>
        <p className="basic-info__section-basic-name">
          {profile.user.firstname} {profile.user.lastname}
        </p>
        <p className="basic-info__section-basic-title">
          {profile.academicTitle}
        </p>
        {/* <p className="basic-info__text">Lastname: {profile.user.lastname}</p> */}
        {/* <p className="basic-info__text">Email: {profile.user.email} </p> */}

        {/* <AnimatePresence>
          <motion.button exit={{ opacity: 0 }} type="button">
            View More
          </motion.button>
        </AnimatePresence> */}
      </div>
      <div className="basic-info__section-details">
        <Details profile={profile} />
      </div>
    </motion.div>
  );
};

export default BasicInfo;
