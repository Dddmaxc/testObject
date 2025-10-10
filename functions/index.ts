import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const getOrders = functions.https.onRequest(async (_req, res) => {
  const snapshot = await db.collection("orders").get();
  const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(orders);
});