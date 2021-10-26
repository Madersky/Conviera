import buildClient from '../api/buildClient';

const overlayHide = () => {
  let overlay = document.getElementById('overlay');
  // hide.style.transition = 'ease 1s';
  // hide.style.transform = 'translateY(200px)';
  overlay.style.animation = 'overlay-hide 1s';

  setTimeout(function () {
    overlay.style.display = 'none';
  }, 500);
};

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <div className="content">
      <h1>You are signed in {currentUser.email}</h1>
    </div>
  ) : (
    <div className="">POPRAWIĆ</div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
