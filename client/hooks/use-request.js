import axios from 'axios';
import { useState } from 'react';

const UseRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  // console.log(errors);
  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      const fields = err.response.data.errors.map((err) => err.param);
      const errorMessage = err.response.data.errors.map((err) => err.msg);
      const objectFields = [];
      const objectMessage = [];

      for (let i = 0; i < errorMessage.length; i++) {
        objectMessage[fields[i]] = errorMessage[i];
      }

      fields.forEach((element) => {
        objectFields[element] = element;
      });
      setErrors({
        default: (
          <div className="lead text-center text-danger fw-bold mt-3">
            {err.response.data.errors.map((err) => (
              <div key={err.message}>{err.message}</div>
            ))}
          </div>
        ),
        fields: objectFields,
        message: objectMessage,
      });
    }
  };

  return [doRequest, errors];
};

export default UseRequest;
