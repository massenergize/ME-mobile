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

  const handleSignIn = (values) => {
    const [userEmail, setUserEmail] = useState("");
    setUserEmail(values.email);
    setIsSubmitting(true);
    signInWithEmailAndPassword(
      values.email,
      values.password,
      (userCreds, error) => {
        // useAuth.signInWithEmailAndPassword is fetching ME's token behind the scenes.
        setIsSubmitting(false);
        if (error) {
          setErrorMsg(error);
        } else {
          setUserEmail(values.email);
          console.log("User signed in successfully!");
          console.log("is user email verified?", userCreds.user.emailVerified);
          console.log("authState: ", authState);
          console.log("The user signed up with", values.email, " " , userEmail, " ", userCreds.user.email);
          navigation.navigate("dashboard", { userEmail: userCreds.user.email });
          console.log("testing");
        }
      }
    );
    
  };
  const fetchToken = (fbToken, callBackFn = null, moreInfo = {}) => {
    apiCall("auth.login", { idToken: fbToken })
      .then((response) => {
        console.log("123authenticated");
        console.log(route.params?.userPass);
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
          console.log(profile, userEmail, userPass);
          console.log("Success!!");
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
