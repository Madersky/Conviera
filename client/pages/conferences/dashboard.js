const Dashboard = ({ conferences, currentUser }) => {
  return (
    <div className="conferences">
      <div className="conferences__dashboard">
        <div className="conferences__dashboard--left">
          <h1>section left</h1>
        </div>
        <div className="conferences__dashboard--right">
          <h1>section right</h1>
        </div>
      </div>
    </div>
  );
};

Dashboard.getInitialProps = async (context, client, currentUser) => {
  const conferencesRes = await client.get("/api/conferences");
  console.log(conferencesRes.data);
  return {
    ...conferencesRes.data,
    currentUser,
  };
};

export default Dashboard;
