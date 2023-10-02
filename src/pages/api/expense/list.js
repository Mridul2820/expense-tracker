import { Query } from "appwrite";
import {
  EXPENSE_COLLECTION_ID,
  EXPENSE_DATABASE_ID,
  account,
  database,
} from "@/config/appwrite";

export default async (req, res) => {
  const method = req.method;

  if (method === "POST") {
    const { userId } = req.body;
    const { jwt } = req.headers;

    if (!userId || !jwt) {
      return res.status(401).json({ message: "Missing fields" });
    }
    account.client.setJWT(jwt);

    try {
      const items = await database.listDocuments(
        EXPENSE_DATABASE_ID,
        EXPENSE_COLLECTION_ID,
        [Query.equal("userId", [userId]), Query.orderDesc("$createdAt")]
      );

      return res.status(200).json({ items: items.documents });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
};
