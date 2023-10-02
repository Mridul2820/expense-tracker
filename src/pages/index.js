import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { useCookie } from "next-cookie";

import {
  EXPENSE_COLLECTION_ID,
  EXPENSE_DATABASE_ID,
  account,
  database,
} from "@/config/appwrite";

const Home = (props) => {
  const [expenses, setExpenses] = useState();
  const cookie = useCookie(props.cookie);
  const jwt = cookie.get("jwt");
  const userId = cookie.get("userid");
  account.client.setJWT(jwt);

  console.log("userId", userId);

  useEffect(() => {
    const getExpenses = async () => {
      const items = await database.listDocuments(
        EXPENSE_DATABASE_ID,
        EXPENSE_COLLECTION_ID,
        [Query.equal("userId", [userId]), Query.orderDesc("$createdAt")]
      );
      setExpenses(items);
    };
    getExpenses();
  }, []);

  console.log("expenses", expenses);

  return <div>Home</div>;
};

export default Home;
