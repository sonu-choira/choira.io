import axios from "axios";
import { globalErrorReducerActions } from "./_globalErrorSlice";

axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

console.log("URL", axios.defaults.baseURL);

const sendRequest = (onSend, onSuccess, payload) => {
  return async (dispatch) => {
    onSend(dispatch);
    try {
      const result = await axios.request(payload);
      onSuccess(dispatch, result.data);
    } catch (error) {
      if (error.response) {
        dispatch(
          globalErrorReducerActions.setError({
            message: error.response.data.message,
            code: 422,
          })
        );
        return;
      }
      dispatch(
        globalErrorReducerActions.setError({
          message: error.message,
          code: 404,
        })
      );
    }
  };
};

export default sendRequest;
