import { apiCall } from "../../api/functions";

export default function useME() {
  /**
   * Fetches the token from the backend and calls the callback function with the response.
   * @param {String} fbToken Firebase token
   * @param {CallableFunction} callBackFn callback function to be called after the token is fetched or if there is an error.
   */
  const fetchToken = (fbToken, callBackFn = null, moreInfo = {}) => {
    apiCall("auth.login", { idToken: fbToken })
      .then((response) => {
        if (callBackFn) callBackFn(response, null);
      })
      .catch((error) => {
        if (callBackFn) callBackFn(null, error?.toString());
      });
  };

  /**
   * Creates a user profile in the backend and calls the callback function with the response.
   * @param {Object} profile {full_name, preferred_name, email, location, is_vendor, accepts_terms_and_conditions, subdomain, color}
   * @param {CallableFunction} callBackFn callback function to be called after the user is created or if there is an error.
   */
  const createUserProfile = (profile, callBackFn = null) => {
    apiCall("users.create", profile)
      .then(async (response) => {
        if (response?.success && response?.data) {
          // TODO: figure out what to do with the response
          if (callBackFn) callBackFn(response, null);
        } else {
          console.log("Error creating user profile: ", response?.error);
        }
      })
      .catch((error) => {
        if (callBackFn) callBackFn(null, error?.toString());
      });
  };

  const validateUsername = (username, callBackFn = null) => {
    apiCall("users.validate.username", {username})
      .then((response) => {
        if (response.success) {
          const {valid, code, suggested_username, message = null} = response.data;
          if (valid) {
            if (callBackFn) callBackFn({valid, data: suggested_username}, null);
          } else if (code === 911) {
            if (callBackFn) callBackFn({valid, data: message}, null);
          } else {
            if (callBackFn) callBackFn({valid, data: `Try ${suggested_username}`}, null);
          }
        } else {
          if (callBackFn) callBackFn(null, response.error);
        }
      })
      .catch((error) => {
        if (callBackFn) callBackFn(null, error?.toString());
      })
  };

  return { fetchToken, validateUsername, createUserProfile };
}
