import dayjs from "dayjs";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const ExpenseList = ({ expenses, setPopup }) => {
  return (
    <div className="pt-3">
      {expenses?.length > 0 &&
        expenses?.map((expense) => (
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
                <button
                  className="cursor-pointer"
                  onClick={() => setPopup({ type: "edit", data: expense })}
                >
                  <AiOutlineEdit className="text-blue-800" />
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => setPopup({ type: "delete", data: expense })}
                >
                  <AiOutlineDelete className="text-red-800" />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ExpenseList;
