const Conference = ({ conference, currentUser }) => {
  return (
    <div className="conference">
      <div className="conference__dashboard">
        <div className="conference__dashboard--left">
          <div className="conference__info">
            <div className="conference__info-header">
              <h1>{conference.name}</h1>
              <button>Join</button>
            </div>
          </div>
        </div>
        <div className="conference__dashboard--right">
          <h1>section right</h1>
        </div>
      </div>
    </div>
  );
};

Conference.getInitialProps = async (context, client, currentUser) => {
  const conferenceRes = await client.get(
    `/api/conferences/id/${context.query.conferenceId}`
  );

  return {
    ...conferenceRes.data,
    currentUser,
  };
};

export default Conference;
