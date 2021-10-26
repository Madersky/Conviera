import { useState, useEffect, useRef } from 'react';
import useRequest from '../../../hooks/use-request';
import CustomInput from '../../CustomInput';
import CreateHobby from './CreateHobby';

const Hobbys = ({ hobbys, currentUser }) => {
  const [chosenHobby, setChosenHobby] = useState('');
  const [activeHobbys, setActiveHobbys] = useState(hobbys);
  const [showCreateHobby, setShowCreateHobby] = useState(false);

  const isInitialMount = useRef(true);
  const [deleteHobby, deleteHobbyError] = useRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'put',
    body: {
      tab: 'hobbys',
      value: chosenHobby,
    },
    onSuccess: () => {},
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      onClickDeleteHobby();
    }
  }, [chosenHobby]);

  const onClickDeleteHobby = (e) => {
    console.log(`TO jest state ${chosenHobby}`);
    deleteHobby();
    setActiveHobbys(activeHobbys.filter((hobby) => hobby != chosenHobby));
  };
  return (
    <>
      <div className="hobbys">
        <h1 className="hobbys__title">Hobbys</h1>
        <div className="hobbys__container">
          {activeHobbys.map((hobby) => {
            return hobby ? (
              <div className="hobbys__container__item" key={hobby}>
                {hobby}
                <button
                  className="btn bi bi-patch-minus"
                  value={hobby}
                  onClick={(e) => {
                    setChosenHobby(e.target.value);
                  }}
                ></button>
                {deleteHobbyError}
              </div>
            ) : null;
          })}
        </div>
        <button onClick={() => setShowCreateHobby(!showCreateHobby)}>
          <i className="bi bi-plus"></i>
        </button>
      </div>
      <CreateHobby
        showCreateHobby={showCreateHobby}
        setShowCreateHobby={setShowCreateHobby}
        setActiveHobbys={setActiveHobbys}
        activeHobbys={activeHobbys}
        currentUser={currentUser}
      />
    </>
  );
};

export default Hobbys;
