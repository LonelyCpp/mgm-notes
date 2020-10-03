import firebase from "firebase/app";

/**
 * @param {File} file
 */
export async function uploadFile(file) {
  const splitPath = file.name.split(".");
  const safeExtension = splitPath.length > 1 ? `.${splitPath.pop()}` : "";
  const fileName = Date.now() + safeExtension;

  var storageRef = firebase.storage().ref();
  var newFileRef = storageRef.child(fileName);

  return newFileRef.put(file);
}
