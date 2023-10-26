import { ID } from "appwrite";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import {
  EXPENSE_COLLECTION_ID,
  EXPENSE_DATABASE_ID,
  account,
  database,
} from "@/config/appwrite";

export async function POST(req) {
  const headersList = headers();
  const jwt = headersList.get("jwt");

  if (!jwt) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  account.client.setJWT(jwt);

  const body = await req.json();
  const { userId, title, amount, type } = body;
  if (!userId || !title || !amount || !type) {
    return new NextResponse("Missing fields", { status: 401 });
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
    return new NextResponse("Saved successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", {
      status: 500,
      error: error.message,
    });
  }
}

export async function PUT(req) {
  const headersList = headers();
  const jwt = headersList.get("jwt");

  if (!jwt) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  account.client.setJWT(jwt);

  const body = await req.json();
  const { title, amount, type, docId } = body;
  if (!title || !amount || !type || !docId) {
    return new NextResponse("Missing fields", { status: 401 });
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
    return new NextResponse("Updated successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", {
      status: 500,
      error: error.message,
    });
  }
}

export async function DELETE(req) {
  const headersList = headers();
  const jwt = headersList.get("jwt");

  if (!jwt) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  account.client.setJWT(jwt);

  const body = await req.json();
  const { docId } = body;
  if (!docId) {
    return new NextResponse("Missing fields", { status: 401 });
  }
  try {
    await database.deleteDocument(
      EXPENSE_DATABASE_ID,
      EXPENSE_COLLECTION_ID,
      docId
    );
    return new NextResponse("Deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", {
      status: 500,
      error: error.message,
    });
  }
}
