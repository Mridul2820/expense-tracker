import { Query } from "appwrite";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import {
  EXPENSE_COLLECTION_ID,
  EXPENSE_DATABASE_ID,
  account,
  database,
} from "@/config/appwrite";

export async function POST(req) {
  const body = await req.json();
  const { userId, limit, start } = body;
  const headersList = headers();
  const jwt = headersList.get("jwt");

  if (!userId || !jwt) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  account.client.setJWT(jwt);

  try {
    const items = await database.listDocuments(
      EXPENSE_DATABASE_ID,
      EXPENSE_COLLECTION_ID,
      [
        Query.equal("userId", [userId]),
        Query.orderDesc("$createdAt"),
        Query.limit(limit),
        Query.offset(parseInt(start)),
      ]
    );
    return new NextResponse(
      JSON.stringify({ items: items.documents, total: items.total })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message, code: error.code })
    );
  }
}
