import React from "react";
import toast from "react-hot-toast";

const DeleteExpensePopup = ({ popup, setPopup, deleteExpense }) => {
  console.log(popup);

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-25 flex items-center justify-center">
      <div className="bg-white p-5 relative w-11/12 max-w-xl rounded-md">
        <p className="text-xl font-bold text-center">Delete Expense Expense</p>
        <div className="flex justify-center gap-2 mt-5">
          <button
            className="border rounded-md p-2 bg-red-700 text-white w-40"
            onClick={() => setPopup(null)}
          >
            Cancel
          </button>
          <button
            className="border rounded-md p-2 bg-green-700 text-white w-40 ml-2"
            onClick={() => deleteExpense(popup.data.$id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteExpensePopup;
