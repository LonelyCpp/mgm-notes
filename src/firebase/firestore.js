import firebase from "firebase/app";

/**
 * @typedef noteObj
 * @property {string} filePath
 * @property {string} notesText
 * @property {string} chapterName
 * @property {string} chapterNumber
 */

/**
 * insert given object into firestore
 *
 * @param {string} path
 * @param {noteObj} data
 */
export async function insertNotes(path, data) {
  const { chapterNumber, chapterName, notesText, filePath } = data;

  const firestore = firebase.firestore();
  await firestore.collection(path).add({
    filePath,
    notesText,
    chapterName,
    chapterNumber,
  });
}

export async function getYearList() {
  const firestore = firebase.firestore();
  const res = await firestore.collection("/notes").get();
  return res.docs.map((doc) => doc.id);
}

/**
 *
 * @param {string} collectionPath
 * @returns {Promise<Array<noteObj>>}
 */
export async function getNotes(collectionPath) {
  if (!collectionPath) {
    return;
  }

  const firestore = firebase.firestore();
  const res = await firestore.collection(collectionPath).get();
  return res.docs.map((doc) => doc.data());
}

export const LangList = ["English"];
