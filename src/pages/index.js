import React, { useEffect, useState } from "react";
import { Query } from "appwrite";
import { useCookie } from "next-cookie";
import dayjs from "dayjs";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

import DeleteExpensePopup from "@/components/DeleteExpensePopup";
import ExpenseFormPopup from "@/components/ExpenseFormPopup";
import Navbar from "@/components/Navbar";

const Home = (props) => {
  const [expenses, setExpenses] = useState();
  const [popup, setPopup] = useState(null);
  const cookie = useCookie(props.cookie);
  const router = useRouter();
  const jwt = cookie.get("jwt");
  const userId = cookie.get("userid");

  const getExpenses = async () => {
    const response = await fetch("/api/expense/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwt,
      },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    if (data.error === "Failed to verify JWT. Invalid token: Expired") {
      cookie.remove("jwt");
      cookie.remove("userid");
      toast.error("Session expired, please login again");
      router.push("/login");
    } else {
      setExpenses(data.items);
    }
  };

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line
  }, []);

  const createExpense = async (title, amount, type) => {
    const response = await fetch("/api/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwt,
      },
      body: JSON.stringify({
        userId: userId,
        title: title,
        amount: amount,
        type: type,
      }),
    });

    if (response.status === 200) {
      toast.success("Saved successfully");
      setPopup(null);
      getExpenses();
    }
  };

  const editExpense = async (docId, title, amount, type) => {
    const response = await fetch("/api/expense", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        jwt,
      },
      body: JSON.stringify({
        docId: docId,
        title: title,
        amount: amount,
        type: type,
      }),
    });

    if (response.status === 200) {
      toast.success("Updated successfully");
      setPopup(null);
      getExpenses();
    }
  };

  const deleteExpense = async (docId) => {
    const response = await fetch("/api/expense", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        jwt,
      },
      body: JSON.stringify({ docId: docId }),
    });

    if (response.status === 200) {
      toast.success("Deleted successfully");
      setPopup(null);
      getExpenses();
    }
  };

  return (
    <>
      {popup?.type === "new" && (
        <ExpenseFormPopup
          setPopup={setPopup}
          action={createExpense}
          form="Create"
        />
      )}
      {popup?.type === "edit" && (
        <ExpenseFormPopup
          form="Update"
          docId={popup?.data?.$id}
          title={popup?.data?.title}
          amount={popup?.data?.amount}
          type={popup?.data?.type}
          popup={popup}
          setPopup={setPopup}
          action={editExpense}
        />
      )}
      {popup?.type === "delete" && (
        <DeleteExpensePopup
          popup={popup}
          setPopup={setPopup}
          deleteExpense={deleteExpense}
        />
      )}
      <Navbar />
      <div className="container mx-auto p-4 max-w-5xl">
        <h1 className="text-2xl text-center font-bold">Your expenses</h1>
        <button
          className="flex justify-center gap-2 border border-green-700 rounded-md px-3 py-1 mx-auto mt-5"
          onClick={() => setPopup({ type: "new", data: null })}
        >
          <AiOutlinePlusCircle className="text-2xl" />
          New Expense
        </button>
        <div className="pt-3">
          {expenses?.length > 0 &&
            expenses?.map((expense) => (
              <div
                className={`border rounded-md p-4 my-4 ${
                  expense.type === "Paid"
                    ? "border-red-800"
                    : "border-green-800"
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
                    <button
                      className="cursor-pointer"
                      onClick={() => setPopup({ type: "edit", data: expense })}
                    >
                      <AiOutlineEdit className="text-blue-800" />
                    </button>
                    <button
                      className="cursor-pointer"
                      onClick={() =>
                        setPopup({ type: "delete", data: expense })
                      }
                    >
                      <AiOutlineDelete className="text-red-800" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
