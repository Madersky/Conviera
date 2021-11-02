import { useState, useEffect, useRef } from "react";
import UseRequest from "../../../hooks/use-request";

const ImagePanel = ({ profile, currentUser }) => {
  const [profilePhoto, setProfilePhoto] = useState();
  const [profilePhotoName, setProfilePhotoName] = useState("Choose file");
  const [photoUrl, setPhotoUrl] = useState(profile.profilePhoto);
  const isInitialMount = useRef(true);

  const [isOpen, setIsOpen] = useState(false);

  const [patchProfilePhotoRequest, patchProfilePhotoErrors] = UseRequest({
    url: `/api/profiles/${currentUser._id}/photo`,
    method: "patch",
    body: {
      photoUrl: photoUrl,
    },
    onSuccess: () => {
      setProfilePhotoName("Choose file");
      console.log("Profile Photo updated");
    },
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      patchProfilePhotoRequest();
    }
  }, [photoUrl]);

  const uploadProfilePhoto = async () => {
    const photo = profilePhoto;
    const { randomBytes } = await import("crypto");

    var name = randomBytes(32).toString("hex");

    const response = await fetch("/api/s3", {
      method: "post",
      body: JSON.stringify({
        type: photo.type,
        name: name,
      }),
    });

    const { url } = await response.json();

    await fetch(url, {
      method: "PUT",
      body: photo,
      headers: {
        "Content-Type": photo.type,
      },
    });

    setPhotoUrl(
      `https://meetbe-images.s3.eu-central-1.amazonaws.com/profilePhotos/${name}`
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    uploadProfilePhoto();
    setIsOpen(!isOpen);
  };

  const onChange = (e) => {
    if (e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
      setProfilePhotoName(e.target.files[0].name);
    }
  };

  const onClick = (e) => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="image-container">
      <div className="image">
        <img
          src={photoUrl}
          onClick={onClick}
          style={{
            position: "relative",
            minWidth: "200px",
            maxWidth: "200px",
            minHeight: "200px",
            maxHeight: "200px",
            cursor: "pointer",
          }}
        ></img>
        <form
          onSubmit={onSubmit}
          className="image__form"
          style={isOpen === true ? { display: "flex" } : { display: "none" }}
        >
          <div className="image__form-container">
            <label>
              {profilePhotoName}
              <input
                className="image__form-submit"
                type="file"
                name="photo"
                onChange={onChange}
              />
            </label>
          </div>
          <button
            type="submit"
            style={
              profilePhotoName !== "Choose file"
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImagePanel;
