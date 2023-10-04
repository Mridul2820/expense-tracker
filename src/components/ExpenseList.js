import React from "react";
import dayjs from "dayjs";

const ExpenseList = ({ expenses, setPopup }) => {
  return (
    <div className="u-padding-block-8 u-width-full-line">
      {expenses?.length > 0 &&
        expenses?.map((expense) => (
          <div
            className="card u-padding-block-16 u-margin-block-start-12"
            key={expense.$id}
          >
            <div className="u-flex u-main-space-between">
              <p className="heading-level-4 u-bold">{expense.title}</p>
              <div className="u-flex u-gap-8">
                <p className="heading-level-5 u-bold">
                  {expense.type === "Paid" && "-"}
                  {expense.type === "Received" && "+"}${expense.amount}
                </p>
                <span
                  className={
                    expense.type === "Paid" ? "tag is-danger" : "tag is-success"
                  }
                >
                  {expense.type}
                </span>
              </div>
            </div>
            <div className="u-flex u-main-space-between">
              <p className="body-text-1">
                {dayjs(expense.$createdAt).format("DD MMM YYYY hh:mm A")}
              </p>
              <div className="u-flex u-gap-8">
                <button
                  className="cursor-pointer"
                  onClick={() => setPopup({ type: "edit", data: expense })}
                >
                  <div className="icon-pencil-alt" />
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => setPopup({ type: "delete", data: expense })}
                >
                  <div className="icon-trash" />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ExpenseList;
