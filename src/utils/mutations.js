import { addDoc, collection, updateDoc, doc, deleteDoc, getDoc} from "firebase/firestore";
import { db } from './firebase';

let deletedEntry;
// Functions for database mutations

export const emptyEntry = {
   name: "",
   link: "",
   description: "",
   user: "",
   category: 0,
}

export async function addEntry(entry) {
   await addDoc(collection(db, "entries"), {
      name: entry.name,
      link: entry.link,
      description: entry.description,
      user: entry.user,
      category: entry.category,
      // The ID of the current user is logged with the new entry for database user-access functionality.
      // You should not remove this userid property, otherwise your logged entries will not display.
      userid: entry.userid,
   });
}

export async function updateEntry(entry) {
   await updateDoc(doc(db, "entries", entry.id), {
      name: entry.name,
      link: entry.link,
      description: entry.description,
      category: entry.category,
   });
}

// TODO: Create Mutation to Delete Entry
export async function deleteEntry(entry) {
   //assign the entry to a deletedEntry object
   deletedEntry = entry;
   await deleteDoc(doc(db, "entries", entry.id));
}

// Create Mutation to Undo a Deleted Entry
export async function undoDelete() {
   //Check if Deleted Entry Exists
   if (!deletedEntry) {
      return;
   }
   // Add Deleted Entry Back
   await addDoc(collection(db, "entries"), deletedEntry);
   deletedEntry = null;
}

