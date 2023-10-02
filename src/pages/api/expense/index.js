import { ID } from "appwrite";
import {
  EXPENSE_COLLECTION_ID,
  EXPENSE_DATABASE_ID,
  account,
  database,
} from "@/config/appwrite";

export default async (req, res) => {
  const method = req.method;
  const { jwt } = req.headers;
  if (!jwt) {
    return res.status(400).json({ message: "Unauthorized" });
  }
  account.client.setJWT(jwt);

  if (method === "POST") {
    const { userId, title, amount, type } = req.body;
    if (!userId || !title || !amount || !type) {
      return res.status(401).json({ message: "Missing fields" });
    }
    try {
      await database.createDocument(
        EXPENSE_DATABASE_ID,
        EXPENSE_COLLECTION_ID,
        ID.unique(),
        {
          userId: userId,
          title: title,
          amount: amount,
          type: type,
        }
      );
      return res.status(200).json({ message: "Saved successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (method === "PUT") {
    const { title, amount, type, docId } = req.body;
    if (!title || !amount || !type || !docId) {
      return res.status(401).json({ message: "Missing fields" });
    }
    try {
      await database.updateDocument(
        EXPENSE_DATABASE_ID,
        EXPENSE_COLLECTION_ID,
        docId,
        {
          title: title,
          amount: amount,
          type: type,
        }
      );
      return res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (method === "DELETE") {
    const { docId } = req.body;
    try {
      await database.deleteDocument(
        EXPENSE_DATABASE_ID,
        EXPENSE_COLLECTION_ID,
        docId
      );
      return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
};
