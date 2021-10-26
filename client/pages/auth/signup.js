import { useState } from 'react';
import Router from 'next/router';
import CustomInput from '../../components/CustomInput';

import useRequest from '../../hooks/use-request';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [createUserRequest, createUserErrors] = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      firstname,
      lastname,
      password,
    },

    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await createUserRequest();
  };

  return (
    <div className="container-lg mt-5">
      <div className="row justify-content-start mt-5">
        <div className="col-4 bg-light mt-5">
          <form onSubmit={onSubmit}>
            <h1 className="lead fs-1">Sign Up</h1>

            {/* EMAIL ADDRESS */}
            <CustomInput
              name="E-mail Address"
              id="email"
              type="text"
              className="input-group mb-3"
              value={email}
              setter={setEmail}
              placeholder="e.g. example@example.com"
              error={createUserErrors && createUserErrors.message['email']}
              iClass="bi-chat-right-dots-fill"
            />
            <CustomInput
              name="Firstname"
              id="firstname"
              type="text"
              className="input-group mb-3"
              value={firstname}
              setter={setFirstname}
              placeholder="e.g. Andrew"
              // error={createUserErrors && createUserErrors.message['password']}
              iClass="bi-person-fill"
            />

            <CustomInput
              name="Lastname"
              id="lastname"
              type="text"
              className="input-group mb-3"
              value={lastname}
              setter={setLastname}
              placeholder="e.g. Muller"
              // error={createUserErrors && createUserErrors.message['password']}
              iClass="bi-person-fill"
            />

            <CustomInput
              name="Password"
              id="password"
              type="password"
              className="input-group mb-3"
              value={password}
              setter={setPassword}
              placeholder="***********"
              error={createUserErrors && createUserErrors.message['password']}
              iClass="bi-shield-lock-fill"
            />

            <div className="justify-content-center text-center">
              <button className="btn btn-light border my-5 ">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
