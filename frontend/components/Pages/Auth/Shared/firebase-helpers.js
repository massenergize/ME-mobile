import { AUTH } from "../../../../config/firebaseConfig";
import { translateFirebaseError } from "./utils";

/**
 * Wrapper function for firebase sign in with email and password.
 * @param {String} email
 * @param {String} password
 * @param {CallableFunction} callBackFn callback function to be called after the user is logged in or if there is an error.
 * callBackFn(userCredential, error)
 */
export const signInwithEmailAndPassword = (
  email,
  password,
  callBackFn = null
) => {
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

/**
 * Wrapper function for firebase sign up with email and password.
 * @param {String} email
 * @param {String} password
 * @param {CallableFunction} callBackFn callback function to be called after the user is created or if there is an error.
 * callBackFn(userCredential, error)
 */
export const registerWithEmailAndPassword = (
  email,
  password,
  callBackFn = null
) => {
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
