import React, { useState, useEffect } from "react";

import { AUTH } from "../../config/firebaseConfig";
import { translateFirebaseError } from "../Shared/Utils";

export default function useAuth() {
  const [user, setUser] = useState(null);

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
   * Wrapper function for firebase sign up with email and password.
   * @param {String} email
   * @param {String} password
   * @param {CallableFunction} callBackFn callback function to be called after the user is created or if there is an error.
   * callBackFn(userCredential, error)
   */
  const registerWithEmailAndPassword = (email, password, callBackFn = null) => {
    AUTH.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Registered and signed in
        if (callBackFn) {
          callBackFn(userCredential, null);
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
  const signInWithEmailAndPassword = (email, password, callBackFn = null) => {
    AUTH.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        if (callBackFn) {
          callBackFn(userCredential, null);
        }
      })
      .catch((error) => {
        if (callBackFn) {
          callBackFn(null, translateFirebaseError(error?.toString()));
        }
      });
  };

  return { user, signInWithEmailAndPassword, registerWithEmailAndPassword };
}
