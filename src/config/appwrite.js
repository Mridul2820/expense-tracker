import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("651a8fed01037304e979");

export const account = new Account(client);
export const database = new Databases(client);

export const EXPENSE_DATABASE_ID = "expense-items";
export const EXPENSE_COLLECTION_ID = "651abb244529395b5d1f";
