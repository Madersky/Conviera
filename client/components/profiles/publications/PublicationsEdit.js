import React, { useState, useEffect, useRef } from "react";
import UseRequest from "../../../hooks/use-request";
import CustomInput from "../../CustomInput";

const PublicationsEdit = ({ publications, currentUser }) => {
  const [addMode, setAddMode] = useState(false);
  const [chosenPublication, setChosenPublication] = useState({});
  const [activePublications, setActivePublications] = useState(publications);

  const isInitialMount = useRef(true);

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [doi, setDoi] = useState("");
  const [description, setDescription] = useState("");

  const [deletePublicationRequest, deletePublicationRequestErrors] = UseRequest(
    {
      url: `/api/profiles/id/${currentUser._id}`,
      method: "put",
      body: {
        tab: "publications",
        value: chosenPublication,
      },
      onSuccess: (responseData) => {},
    }
  );

  const [createPublicationRequest, createPublicationRequestErrors] = UseRequest(
    {
      url: `/api/profiles/id/${currentUser._id}/publications`,
      method: "post",
      body: {
        publications: {
          title,
          time,
          doi,
          description,
        },
      },
      onSuccess: (responseData) => {},
    }
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      onClickDeletePublication();
    }
  }, [chosenPublication]);

  const handleAddMode = (e) => {
    e.preventDefault();
    setAddMode(!addMode);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createPublicationRequest();
    setAddMode(!addMode);
    setActivePublications([
      ...activePublications,
      {
        title: title,
        time: time,
        doi: doi,
        description: description,
      },
    ]);
  };

  const onClickDeletePublication = () => {
    console.log("LOG Z ONDELETE", chosenPublication);
    deletePublicationRequest();
    setActivePublications(
      activePublications.filter(
        (publication) => publication.title != chosenPublication.title
      )
    );
  };

  return (
    <div className="publications-edit">
      <h2 className="publications__header">Publications</h2>
      <button onClick={handleAddMode}>New Publication</button>
      {addMode === true ? (
        <div>
          <h3>Add new publication</h3>

          <form onSubmit={onSubmit}>
            <CustomInput
              name="Title"
              id="title"
              type="text"
              value={title}
              setter={setTitle}
              error={
                createPublicationRequestErrors &&
                createPublicationRequestErrors.message["description"]
              }
            />
            <CustomInput
              name="Publication time"
              id="time"
              type="text"
              value={time}
              setter={setTime}
              error={
                createPublicationRequestErrors &&
                createPublicationRequestErrors.message["description"]
              }
            />
            <CustomInput
              name="DOI"
              id="doi"
              type="text"
              value={doi}
              setter={setDoi}
              error={
                createPublicationRequestErrors &&
                createPublicationRequestErrors.message["description"]
              }
            />
            <div className="publications__textarea">
              <label>Description</label>
              <textarea
                className="publications__textarea-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="6"
              ></textarea>
            </div>
            <button type="submit">ADD</button>
          </form>
        </div>
      ) : null}

      {activePublications.slice(0, 3).map((publication) => {
        return (
          <div key={publication.doi} className="publications__instance">
            <div className="publications__section">
              <h3 className="publications__instance-title">
                {publication.title}
              </h3>
              {/* <div className="publications__edit"> */}
              <button
                className="publications__edit-button"
                value={JSON.stringify(publication)}
                onClick={(e) =>
                  setChosenPublication(JSON.parse(e.target.value))
                }
              >
                Delete
              </button>
              {/* </div> */}
            </div>
            <p>{publication.time}</p>
            <p className="publications__instance-doi">{publication.doi}</p>
            <p>{publication.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PublicationsEdit;
