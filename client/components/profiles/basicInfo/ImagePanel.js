import { useState, useEffect, useRef } from 'react';
import UseRequest from '../../../hooks/use-request';

const ImagePanel = ({ profile, currentUser }) => {
  const [profilePhoto, setProfilePhoto] = useState();
  const [profilePhotoName, setProfilePhotoName] = useState('Choose file');
  const [photoUrl, setPhotoUrl] = useState(profile.profilePhoto);
  const isInitialMount = useRef(true);

  const [patchProfilePhotoRequest, patchProfilePhotoErrors] = UseRequest({
    url: `/api/profiles/${currentUser._id}/photo`,
    method: 'patch',
    body: {
      photoUrl: photoUrl,
    },
    onSuccess: () => {
      setProfilePhotoName('Choose file');
      console.log('Profile Photo updated');
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
    const { randomBytes } = await import('crypto');

    var name = randomBytes(32).toString('hex');

    const response = await fetch('/api/s3', {
      method: 'post',
      body: JSON.stringify({
        type: photo.type,
        name: name,
      }),
    });

    const { url } = await response.json();

    await fetch(url, {
      method: 'PUT',
      body: photo,
      headers: {
        'Content-Type': photo.type,
      },
    });

    setPhotoUrl(
      `https://meetbe-images.s3.eu-central-1.amazonaws.com/profilePhotos/${name}`
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    uploadProfilePhoto();
  };

  const onChange = (e) => {
    if (e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
      setProfilePhotoName(e.target.files[0].name);
    }
  };

  return (
    <div className="image-container">
      <div className="image">
        <img
          src={photoUrl}
          style={{
            position: 'relative',
            minWidth: '200px',
            maxWidth: '200px',
            minHeight: '200px',
            maxHeight: '200px',
          }}
        ></img>
      </div>
      <form onSubmit={onSubmit} className="image-form">
        <div className="image-form__container">
          <label>
            {profilePhotoName}
            <input
              className="image-form__submit"
              type="file"
              name="photo"
              onChange={onChange}
            />
          </label>
        </div>
        <button
          type="submit"
          style={
            profilePhotoName !== 'Choose file'
              ? { display: 'flex' }
              : { display: 'none' }
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ImagePanel;
