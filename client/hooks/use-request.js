import axios from "axios";
import { useState } from "react";

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
      // const siema = err;
      // console.log("to jest siema", siema);

      if (err.response.data.errors) {
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
          fields: objectFields,
          message: objectMessage,
        });
      } else {
        console.log(err.response.data);
      }
    }
  };

  return [doRequest, errors];
};

export default UseRequest;
