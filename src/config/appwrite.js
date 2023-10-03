import { Client, Databases, Account } from "appwrite";

export const config = {
  APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
  EXPENSE_DATABASE_ID: process.env.NEXT_PUBLIC_EXPENSE_DATABASE_ID,
  EXPENSE_COLLECTION_ID: process.env.NEXT_PUBLIC_EXPENSE_COLLECTION_ID,
};

const client = new Client();
client
  .setEndpoint(config.APPWRITE_ENDPOINT)
  .setProject(config.APPWRITE_PROJECT);

export const EXPENSE_DATABASE_ID = config.EXPENSE_DATABASE_ID;
export const EXPENSE_COLLECTION_ID = config.EXPENSE_COLLECTION_ID;

export const account = new Account(client);
export const database = new Databases(client);
