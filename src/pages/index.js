import React, { useEffect, useState } from "react";
import { useCookie } from "next-cookie";
import { AiOutlinePlusCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

import DeleteExpensePopup from "@/components/DeleteExpensePopup";
import CreateExpensePopup from "@/components/CreateExpensePopup";
import Navbar from "@/components/Navbar";
import ExpenseList from "@/components/ExpenseList";
import EditExpensePopup from "@/components/EditExpensePopup";

const Home = (props) => {
  const [expenses, setExpenses] = useState();
  const [popup, setPopup] = useState(null);
  const [start, setStart] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 4;
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
      body: JSON.stringify({
        userId: userId,
        start: start,
        limit: limit,
      }),
    });
    const data = await response.json();
    if (data.error === "Failed to verify JWT. Invalid token: Expired") {
      cookie.remove("jwt");
      cookie.remove("userid");
      toast.error("Session expired, please login again");
      router.push("/login");
    } else {
      setExpenses(data.items);
      setTotal(data.total);
    }
  };

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line
  }, [start]);

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
      setStart(0);
    }
  };

  const pages = Math.ceil(total / limit);

  return (
    <>
      {popup?.type === "new" && (
        <CreateExpensePopup setPopup={setPopup} createExpense={createExpense} />
      )}
      {popup?.type === "edit" && (
        <EditExpensePopup
          docId={popup?.data?.$id}
          title={popup?.data?.title}
          amount={popup?.data?.amount}
          type={popup?.data?.type}
          popup={popup}
          setPopup={setPopup}
          editExpense={editExpense}
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
        <ExpenseList setPopup={setPopup} expenses={expenses} />
        <div className="flex justify-center gap-3">
          {expenses?.length > 0 &&
            [...Array(pages)].map((_, i) => (
              <button
                key={i}
                className={`border border-green-700 rounded-full px-3 py-1 mt-5 ${
                  i * limit === start
                    ? "bg-green-700 text-white"
                    : "bg-white text-green-700"
                }
              `}
                onClick={() => setStart(i * limit)}
              >
                {i + 1}
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
