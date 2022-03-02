import admin from '../firebase/nodeApp'
import {dateStamp} from "./common_utils";

export const addTicket = async (name, ticket_number) => {
  const db = admin.firestore()
  const ticketCollection = db.collection('tickets')
  const ticketDoc = await ticketCollection.doc(dateStamp()).get()
  ticketDoc.set({[name]: ticket_number}, {merge: true})
}

export const getTickets = async (date) => {
  const db = admin.firestore()
  const ticketCollection = db.collection('tickets')
  const ticketDoc = await ticketCollection.doc(date).get()

  if (!ticketDoc.exists) {
    return null
  }

  return ticketDoc.data();
}

export const getTicketsByDateAndName = async (date, name) => {
  const db = admin.firestore()
  const ticketCollection = db.collection('tickets')
  const ticketDoc = await ticketCollection.doc(date).get()

  if (!ticketDoc.exists) {
    return null
  }

  return ticketDoc.data()[name];
}
