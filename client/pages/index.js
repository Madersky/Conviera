const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <div className="content">
      <h1>You are signed in {currentUser.firstname}</h1>
    </div>
  ) : (
    <div className="">POPRAWIĆ</div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
