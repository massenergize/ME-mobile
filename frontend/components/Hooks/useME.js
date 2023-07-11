import { apiCall } from "../../api/functions";

export default function useME() {
  const fetchToken = (fbToken, callBackFn = null) => {
    apiCall("auth.login", { idToken: fbToken })
      .then((response) => {
        if (callBackFn) callBackFn(response, null);
      })
      .catch((error) => {
        if (callBackFn) callBackFn(null, error?.toString());
      });
  };

  return { fetchToken };
}
