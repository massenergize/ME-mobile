import React, { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleAuthProvider } from "firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import useME from "./useME";
import Constants from "../Constants";
import { AUTH } from "../../config/firebaseConfig";
import { translateFirebaseError } from "../Shared/Utils";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState(
    Constants.USER_IS_NOT_AUTHENTICATED
  );

  const { fetchToken } = useME();

  useEffect(() => {
    _fetchUserFromStorage();
    const unsubscribe = AUTH.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await AsyncStorage.setItem("@FBUser", JSON.stringify(user));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  /**
   * Fetches the user from the local storage.
   * TODO: switch from AsyncStorage to SecureStore.
   * reference: https://docs.expo.dev/guides/authentication/#storing-data
   */
  const _fetchUserFromStorage = async () => {
    try {
      const user = await AsyncStorage.getItem("@FBUser");
      const userData = user ? JSON.parse(user) : null;
      setUser(userData);
    } catch (error) {
      console.log("error fetching user from storage: ", error);
    }
  };

  /**
   * Fetches the token from the backend and calls the callback function with the response.
   * @param {firebase.User} userObj firebase user object
   */
  const fetchMEToken = async (userObj) => {
    const _fbToken = await userObj?.getIdTokenResult();
    fetchToken(_fbToken.token, (response, error) => {
      if (error) {
        console.log("error fetching API to get token: ", error);
        setAuthState(Constants.SERVER_ERROR);
      } else {
        if (!response.success) {
          if (response.error === Constants.NEEDS_REGISTRATION) {
            setAuthState(Constants.NEEDS_REGISTRATION);
          } else {
            console.log("error fetching token result: ", response.error);
            setAuthState(Constants.SERVER_ERROR);
          }
        } else {
          setAuthState(Constants.USER_IS_AUTHENTICATED);
        }
      }
    });
  };

  /**
   * Wrapper function for firebase sign up with email and password.
   * @param {String} email
   * @param {String} password
   * @param {CallableFunction} callBackFn callback function to be called after the user is created or if there is an error.
   * callBackFn(userCredential, error)
   */
  const registerWithEmailAndPassword = (email, password, callBackFn) => {
    AUTH.createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        // Registered and signed in
        if (callBackFn) {
          callBackFn(userCredentials, null);
        }
      })
      .catch((error) => {
        if (callBackFn) {
          callBackFn(null, translateFirebaseError(error?.toString()));
        }
      });
  };

  /**
   * Wrapper function for firebase sign in with email and password.
   * @param {String} email
   * @param {String} password
   * @param {CallableFunction} callBackFn callback function to be called after the user is logged in or if there is an error.
   * callBackFn(userCredential, error)
   */
  const signInWithEmailAndPassword = (email, password, callBackFn) => {
    AUTH.signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        // Signed in
        setAuthState(Constants.CHECK_MASS_ENERGIZE);

        if (callBackFn) {
          callBackFn(userCredentials, null);
        }
      })
      .catch((error) => {
        if (callBackFn) {
          callBackFn(null, translateFirebaseError(error?.toString()));
        }
      });
  };

  /**
   * Wrapper function for firebase sign in with Google.
   * @param {CallableFunction} callBackFn
   */
  const authenticateWithGoogle = async (callBackFn) => {
    try {
      // presence of up-to-date Google Play Services is required to show the sign in modal.
      // reference: https://github.com/react-native-google-signin/google-signin#hasplayservicesoptions
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = await GoogleAuthProvider.credential(idToken);

      AUTH.signInWithCredential(googleCredential)
        .then((userCredential) => {
          // Signed in
          setAuthState(Constants.CHECK_MASS_ENERGIZE);
          if (callBackFn) {
            callBackFn(userCredential, null);
          }
        })
        .catch((error) => {
          if (callBackFn) {
            callBackFn(null, translateFirebaseError(error?.toString()));
          }
        });
    } catch (error) {
      // TODO: figure out what to do with these errors.
      if (error.code === "auth/account-exists-with-different-credential") {
        //xx
      } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log("error signing in with google: ", error);
      }
    }
  };

  /**
   * Wrapper function for firebase sign out.
   */
  const signOut = () => {
    console.log("signing out...");
    setAuthState(Constants.USER_IS_NOT_AUTHENTICATED);
    AUTH.signOut();
    // TODO: this line deletes the information that the app obtained from the Google APIs.
    // maybe implement this feature when user wants to delete their account?
    // GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    AsyncStorage.removeItem("@FBUser");
  };

  /**
   * Wrapper function for firebase's send email verification.
   * @param {firebase.User} authUser
   * @param {CallableFunction} callBackFn callback function to be called after the email is sent or if there is an error.
   */
  const sendVerificationEmail = (authUser = null, callBackFn = null) => {
    if (!authUser) {
      authUser = user;
    }

    if (authUser) {
      authUser
        .sendEmailVerification()
        .then(() => {
          if (callBackFn) {
            callBackFn(null);
          }
        })
        .catch((error) => {
          if (callBackFn) {
            callBackFn(translateFirebaseError(error?.toString()));
          }
        });
    }
  };

  return {
    user,
    setUser,
    authState,
    setAuthState,
    signOut,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    authenticateWithGoogle,
    sendVerificationEmail,
    fetchMEToken,
  };
}
