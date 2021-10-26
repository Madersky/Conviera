import { useState } from 'react';
import UseRequest from '../../hooks/use-request';
import { EditExperience } from '../profiles/experience/EditExperience';

const Accordion = ({
  experience,
  currentUser,
  deleteAccordion,
  editDisplay,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [accordionTitle, setAccordionTitle] = useState(experience.title);
  const [accordionDescription, setAccordionDescription] = useState(
    experience.description
  );
  const [deleteAccordionRequest, deleteAccordionErrors] = UseRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'put',
    body: {
      tab: 'experiences',
      value: {
        title: accordionTitle,
      },
    },
    onSuccess: () => {},
  });

  const onDeleteClick = () => {
    deleteAccordionRequest();
    deleteAccordion(experience);
  };
  return (
    <div className="accordion">
      <div className="accordion__section">
        <p>{accordionTitle}</p>
        <div className="">
          <button className="" onClick={onDeleteClick}>
            <i className="bx bx-log-out" />
          </button>
        </div>
        <div className={` ${isOpen ? '' : 'collapse'}`}>
          <div className="  ">
            <div className=" ">{accordionDescription}</div>

            <EditExperience
              experience={experience}
              currentUser={currentUser}
              editDisplay={editDisplay}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
