"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCookie } from "next-cookie";

import DeleteExpensePopup from "@/components/DeleteExpensePopup";
import CreateExpensePopup from "@/components/CreateExpensePopup";
import ExpenseList from "@/components/ExpenseList";
import EditExpensePopup from "@/components/EditExpensePopup";

const Home = (props) => {
  const [expenses, setExpenses] = useState();
  const [popup, setPopup] = useState(null);
  const [start, setStart] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 4;
  const router = useRouter();
  const cookie = useCookie(props.cookie);
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
      <div className="container u-flex-vertical	u-gap-12 u-cross-center">
        <h1 className="heading-level-1 font-bold">Your expenses</h1>
        <button
          className="button"
          onClick={() => setPopup({ type: "new", data: null })}
        >
          <span className="icon-plus" aria-hidden="true"></span>
          <span className="text"> New Expense</span>
        </button>
        <ExpenseList setPopup={setPopup} expenses={expenses} />
        <div className="u-flex u-main-center u-gap-12">
          {expenses?.length > 0 &&
            [...Array(pages)].map((_, i) => (
              <button
                key={i}
                className="button is-only-icon"
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
