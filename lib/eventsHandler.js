import admin from '../firebase/nodeApp'
import {dateStamp} from "./common_utils";

const collectionPath = 'events';
export const addEvent = async (date,name, event) => {
  const db = admin.firestore()
  const eventsCollection = db.collection(collectionPath)
  const eventDoc = await eventsCollection.doc(date).get()
  eventDoc.set({['events']: event}, {merge: true})
}

export const getEvents = async (date) => {
  const db = admin.firestore()
  const eventsCollection = db.collection(collectionPath)
  const eventDoc = await eventsCollection.doc(date).get()

  if (!eventDoc.exists) {
    return {};
  }

  return eventDoc.data();
}

export const getAllEventDates = async () => {
  const snapshot = await admin.firestore().collection(collectionPath).get()
  return await snapshot.docs.map(doc => doc.id);
}

