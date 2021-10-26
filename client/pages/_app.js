import buildClient from '../api/buildClient';
import Navbar from '../components/navbar/Navbar';

import '../styles/main.scss';
// const RenderNav = (currentUser) => {
//   if (currentUser.id) {
//     console.log(`jestem true`, currentUser);
//     return <Navbar userId={currentUser.id} />;
//   } else {
//     console.log(`jestem false`, currentUser);
//     return null;
//   }
// };

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      ></meta>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
      ></link>
      <link
        href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
        rel="stylesheet"
      ></link>

      <Navbar currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
