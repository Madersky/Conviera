import UseRequest from '../../../hooks/use-request';
import CustomInput from '../../CustomInput';

import { useState, useEffect, useRef } from 'react';

// TO SAMO CO W EditProfile, małe zmiany, możliwy refactor
export const CreateExperience = ({ currentUser, createAccordion }) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [createdExperiences, setCreatedExperiences] = useState([]);
  const [createExperienceRequest, createExperienceErrors] = UseRequest({
    url: `/api/profiles/${currentUser._id}/experience`,
    method: 'post',
    body: {
      experience: {
        title,
        description,
      },
    },
    onSuccess: (responseData) => {},
  });

  const isInitialMount = useRef(true);
  const onFormSubmit = (e) => {
    e.preventDefault();
    createExperienceRequest();
    setCreatedExperiences([{ description: description, title: title }]);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      createAccordion(createdExperiences);
    }
  }, [createdExperiences]);

  console.log(
    createExperienceErrors && createExperienceErrors.message['title']
  );

  return (
    <form>
      <CustomInput
        name="Add Title"
        id="description"
        type="text"
        value={title}
        setter={setTitle}
        placeholder="React"
        // Bellow is not working, to fixed
        error={
          createExperienceErrors && createExperienceErrors.message['title']
        }
      />

      <CustomInput
        name="Add description"
        id="description"
        type="text"
        value={description}
        setter={setDescription}
        placeholder="I was learning this for about 5 years"
        // Bellow is not working, to fixed
        error={
          createExperienceErrors &&
          createExperienceErrors.message['description']
        }
      />

      <button
        className="btn btn-primary"
        disabled={title && description ? null : 'disabled'}
        onClick={onFormSubmit}
      >
        Click me to submit the form
      </button>
    </form>
  );
};
