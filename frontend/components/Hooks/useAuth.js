import React, { useState, useEffect } from "react";

import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

import useME from "./useME";
import Constants from "../Constants";
import { AUTH } from "../../config/firebaseConfig";
import { translateFirebaseError } from "../Shared/Utils";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState(
    Constants.USER_IS_NOT_AUTHENTICATED
  );
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_PUBLIC_REACT_APP_EXPO_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_REACT_APP_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_REACT_APP_ANDROID_CLIENT_ID,
  });

  const { fetchToken } = useME();

  useEffect(() => {
    const unsubscribe = AUTH.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  /**
   * Fetches the token from the backend and calls the callback function with the response.
   * @param {firebase.User} userObj firebase user object
   */
  const _fetchMEToken = async (userObj) => {
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

  const authenticateWithGoogle = async (callBackFn) => {
    promptAsync()
      .then(() => {
        if (response?.type === "success") {
          const { authentication } = response;
          const credential = GoogleAuthProvider.credential(
            authentication.idToken,
            authentication.accessToken
          );
          signInWithCredential(AUTH, credential)
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
        }
      })
      .catch((error) => {
        if (callBackFn) {
          callBackFn(null, translateFirebaseError(error?.toString()));
        }
      });
  };

  /**
   * Wrapper function for firebase sign out.
   */
  const signOut = () => {
    console.log("signing out...");
    setAuthState(Constants.USER_IS_NOT_AUTHENTICATED);
    AUTH.signOut();
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
    _fetchMEToken,
  };
}
