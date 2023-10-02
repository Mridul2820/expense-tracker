import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { useCookie } from "next-cookie";
import dayjs from "dayjs";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlinePlusCircle,
} from "react-icons/ai";

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

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-2xl text-center font-bold">Your expenses</h1>
      <button className="flex justify-center gap-2 border border-green-700 rounded-md px-3 py-1 mx-auto mt-5">
        <AiOutlinePlusCircle className="text-2xl" />
        New Expense
      </button>
      <div className="pt-3">
        {expenses?.documents?.length > 0 &&
          expenses?.documents?.map((expense) => (
            <div
              className={`border rounded-md p-4 my-4 ${
                expense.type === "Paid" ? "border-red-800" : "border-green-800"
              }`}
              key={expense.$id}
            >
              <div className="flex justify-between">
                <p className="text-xl font-bold">{expense.title}</p>
                <div className="flex gap-3">
                  <p className="text-xl font-bold">
                    {expense.type === "Paid" && "-"}
                    {expense.type === "Received" && "+"}${expense.amount}
                  </p>
                  <span
                    className={`border px-2 font-semibold rounded-sm ${
                      expense.type === "Paid"
                        ? "border-red-800 bg-red-50"
                        : "border-green-800 bg-gray-50"
                    }`}
                  >
                    {expense.type}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-gray-500">
                  {dayjs(expense.$createdAt).format("DD MMM YYYY hh:mm A")}
                </p>
                <div className="flex gap-2 text-2xl">
                  <button className="cursor-pointer">
                    <AiOutlineEdit className="text-blue-800" />
                  </button>
                  <button className="cursor-pointer">
                    <AiOutlineDelete className="text-red-800" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
