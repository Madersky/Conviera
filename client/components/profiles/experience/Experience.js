import Accordion from '../../accordion/Accordion';
import { CreateExperience } from './CreateExperience';
import { useState } from 'react';

export const Experience = ({ experiences, currentUser }) => {
  const [addMode, setAddMode] = useState(false);
  const [activeExperiences, setActiveExperiences] = useState(experiences);

  const createAccordion = (createdExperiences) => {
    setActiveExperiences([...activeExperiences, ...createdExperiences]);
  };

  const deleteAccordion = (chosenExperience) => {
    const newExperiences = activeExperiences.filter(
      (experience) => experience != chosenExperience
    );
    setActiveExperiences(newExperiences);
  };

  const accordionList = activeExperiences.map((experience, id) => {
    return (
      <Accordion
        experience={experience}
        currentUser={currentUser}
        deleteAccordion={deleteAccordion}
        editDisplay={false}
      />
    );
  });
  return (
    <div className="experience">
      <div className="experience__content">
        <h3 className="experience__header">EXPERIENCE </h3>
        <div className="experience__accordion">{accordionList}</div>
        <button
          className="experience__addmode"
          onClick={() => setAddMode(!addMode)}
        >
          <i className="" />
          add
        </button>
        <div className={`experience__create ${addMode ? '' : 'collapse'}`}>
          <CreateExperience
            currentUser={currentUser}
            createAccordion={createAccordion}
          />
        </div>
      </div>
    </div>
  );
};
