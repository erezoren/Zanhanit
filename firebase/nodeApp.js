import * as admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.projectId,
      clientEmail: process.env.client_email,
      privateKey: process.env.privateKey.replace(/\\n/g, '\n'),
    }),
    storageBucket:process.env.storageBucket,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  })
}

export default admin