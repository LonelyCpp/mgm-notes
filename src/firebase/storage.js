import firebase from "firebase/app";

/**
 * @param {File} file
 */
export async function uploadFile(file) {
  const splitPath = file.name.split(".");
  const safeExtension = splitPath.length > 1 ? `.${splitPath.pop()}` : "";
  const fileName = Date.now() + safeExtension;

  const storageRef = firebase.storage().ref();
  const newFileRef = storageRef.child(fileName);

  return newFileRef.put(file);
}

export async function getDownloadableUrl(fileName) {
  if (!fileName) {
    return;
  }

  const storageRef = firebase.storage().ref();
  const url = await storageRef.child(fileName).getDownloadURL();
  return url;
}
