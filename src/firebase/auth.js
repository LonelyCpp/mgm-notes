import firebase from "firebase/app";
import { userMeta } from "../store/authStore";

export const checkForUser = async () => {
  const user = firebase.auth().currentUser;
  console.log(user);

  if (user) {
    userMeta.set({
      loggedIn: true,
      user: user,
    });

    return true;
  }

  return false;
};

export const loginWithGoogle = async () => {
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const res = await auth.signInWithPopup(googleProvider);
  console.log({ res });

  userMeta.set({
    loggedIn: true,
    user: res.user,
  });

  return true;
};

export const logout = async () => {
  const auth = firebase.auth();
  await auth.signOut();
  userMeta.set({
    loggedIn: false,
    user: null,
  });
};
