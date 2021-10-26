import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import CustomInput from '../../components/CustomInput';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [doRequest, errors] = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest();
  };

  return (
    <div className="container-sm mt-5">
      <div className="row justify-content-center text-muted ">
        <div className="col-sm-6 mt-5">
          <form onSubmit={onSubmit}>
            <h1 className="display-5 text-center">Sign In</h1>
            <CustomInput
              name="E-mail Address"
              id="emailin"
              type="text"
              className="input-group mb-3"
              value={email}
              setter={setEmail}
              placeholder="e.g. example@example.com"
              error={errors && errors.message['email']}
              iClass="bi-chat-right-dots-fill"
            />

            <CustomInput
              name="Password"
              id="passwordin"
              type="password"
              className="input-group mb-3"
              value={password}
              setter={setPassword}
              placeholder="***********"
              error={errors && errors.message['password']}
              iClass="bi-shield-lock-fill"
            />
            <div className="text-center">
              <button className="btn btn-muted  mt-4 border-secondary">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </form>
          {errors && errors.default}
        </div>
      </div>
      <div className="mt-5 border-top"></div>
    </div>
  );
};

export default Signin;
