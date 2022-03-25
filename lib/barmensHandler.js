import admin from '../firebase/nodeApp'
import {COLLECTIONS} from "../components/common/constants";

const collectionPath = COLLECTIONS.BARMENS;

export const getBarmens = async () => {
  const snapshot = await admin.firestore().collection(collectionPath).get()
  return await snapshot.docs.map(doc => {return {"date":doc.id,"barmens":doc.data()['barmens']}});
}


