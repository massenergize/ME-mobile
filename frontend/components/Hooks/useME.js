import { apiCall } from "../../api/functions";
import { useRoute } from '@react-navigation/native';
export default function useME( ) {
  /**
   * Fetches the token from the backend and calls the callback function with the response.
   * @param {String} fbToken Firebase token
   * @param {CallableFunction} callBackFn callback function to be called after the token is fetched or if there is an error.
   */
  const route = useRoute();
  const userEmail = route.params?.userEmail;
  const userPass = route.params?.userPass;

  const fetchToken = (fbToken, callBackFn = null, moreInfo = {}) => {
    apiCall("auth.login", { idToken: fbToken })
      .then((response) => {
        if (callBackFn) callBackFn(response, null, userEmail, userPass);
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
          // handleSignIn();
          // navigation.navigate("dashboard", { userEmail: userEmail, userName: userName });
          
          if (callBackFn) callBackFn(response, null, userEmail, userPass);
        } else {
          console.log("Error creating user profile: ", response?.error);
        }
      })
      .catch((error) => {
        if (callBackFn) callBackFn(null, error?.toString());
      });
  };

  return { fetchToken, createUserProfile };
}
