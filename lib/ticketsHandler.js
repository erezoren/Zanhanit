import admin from '../firebase/nodeApp'
import {dateStamp} from "./common_utils";
import {COLLECTIONS} from "../components/common/constants";

const collectionPath = COLLECTIONS.TICKETS;
export const addTicket = async (name, ticket_number) => {
  const db = admin.firestore()
  const ticketCollection = db.collection(collectionPath)
  const ticketDoc = await ticketCollection.doc(dateStamp()).get()
  ticketDoc.set({[name]: ticket_number}, {merge: true})
}

export const getTickets = async (date) => {
  const db = admin.firestore()
  const ticketCollection = db.collection(collectionPath)
  const ticketDoc = await ticketCollection.doc(date).get()

  if (!ticketDoc.exists) {
    await ticketCollection.doc(date).set({});
    return {};
  }

  return ticketDoc.data();
}

export const getAllTicketsDates = async () => {
  const snapshot = await admin.firestore().collection(collectionPath).get()
  return snapshot.docs.map(doc => doc.id);
}

export const getTicketsByDateAndName = async (date, name) => {
  const db = admin.firestore()
  const ticketCollection = db.collection(collectionPath)
  const ticketDoc = await ticketCollection.doc(date).get()

  if (!ticketDoc.exists) {
    return null
  }

  return ticketDoc.data()[name];
}
