import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

const Details = ({
  isDetailsOpen,
  setIsDetailsOpen,
  profile,
  setIsButtonOpen,
}) => {
  let fieldNames = Object.keys(profile);
  const paragraphHiddenList = fieldNames.map((fieldName) => {
    // split(/(?=[A-Z])/) - wrzuca do tablicy po napotkaniu dużej litery
    const text = fieldName.split(/(?=[A-Z])/).join(' ');

    return fieldName === 'user' ||
      fieldName === '_id' ||
      fieldName === 'version' ||
      fieldName === 'hobbys' ||
      fieldName === 'experiences' ||
      fieldName === 'profilePhoto' ? null : (
      <p key={Math.random(profile._id)} className="basic-info__text">
        {`${text.slice(0, 1).toUpperCase() + text.slice(1)} : ${
          profile[`${fieldName}`] ? profile[`${fieldName}`] : ''
        }`}
      </p>
    );
  });

  const onDetailClose = () => {
    setIsButtonOpen(true);
    setIsDetailsOpen(!isDetailsOpen);
  };

  const variants = {
    exit: { opacity: 0, scaleY: 0, originY: 0, transition: { delay: 0.5 } },
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  return (
    <AnimatePresence>
      {isDetailsOpen && (
        <motion.div
          variants={variants}
          exit="exit"
          initial="hidden"
          animate="visible"
          className={`basic-info__section-basic`}
        >
          {paragraphHiddenList}
          <button onClick={onDetailClose}>Close</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Details;
