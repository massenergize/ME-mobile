export const translateFirebaseError = (error) => {
  if (!error) return;
  if (error.includes("auth/email-already-in-use"))
    return "Hi there, a user already exists with this email.";
  if (error.includes("auth/wrong-password"))
    return "Hi, it looks like you typed a wrong password.";
  if (error.includes("auth/invalid-email"))
    return "Hi, please provide a valid email address, thank you :)";
  if (error.includes("auth/user-not-found"))
    return "Hi, it looks like you do not have an account with this email yet.. :(";
  return error?.toString();
};
