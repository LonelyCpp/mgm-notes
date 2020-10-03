import firebase from "firebase/app";

export async function insertNotes(path, data) {
  const { chapterNumber, chapterName, notesText, filePath } = data;

  const firestore = firebase.firestore();
  await firestore.collection(path).add({
    file_url: filePath,
    raw_notes: notesText,
    chapter_name: chapterName,
    chapter_number: chapterNumber,
  });
}

export async function getYearList() {
  const firestore = firebase.firestore();
  const res = await firestore.collection("/notes").get();
  return res.docs.map((doc) => doc.id);
}

export const LangList = ["English"];
