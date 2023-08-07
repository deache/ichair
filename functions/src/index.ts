import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Request, Response } from "express";

admin.initializeApp();

// Define the function to get products
export const getProducts = functions.https.onRequest(async (request: Request, response: Response) => {
  try {
    const snapshot = await admin.database().ref("products").once("value");
    const products = snapshot.val() ?? [];
    response.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});
