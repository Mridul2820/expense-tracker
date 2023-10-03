import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";

const CreateExpensePopup = ({ setPopup, createExpense }) => {
  const [item, setItem] = useState({
    title: "",
    amount: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!item.title) {
      return toast.error("Title is required");
    }
    if (!item.amount) {
      return toast.error("Amount is required");
    }
    if (!item.type) {
      return toast.error("Type is required");
    }

    await createExpense(item.title, item.amount, item.type);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-25 flex items-center justify-center">
      <div className="bg-white p-5 relative w-11/12 max-w-xl rounded-md">
        <button
          onClick={() => setPopup(null)}
          className="absolute top-2 right-2 p-2"
        >
          <AiOutlineCloseCircle className="text-2xl" />
        </button>
        <p className="text-xl font-bold">Create Expense</p>
        <form className="grid grid-cols-2 gap-3 mt-2" onSubmit={handleSubmit}>
          <div className="col-span-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="border rounded-md p-2 w-full"
              value={item.title}
              onChange={(e) => setItem({ ...item, title: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="amount">Amount($)</label>
            <input
              type="number"
              id="amount"
              min="0"
              className="border rounded-md p-2 w-full"
              value={item.amount}
              onChange={(e) => setItem({ ...item, amount: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <select
              id="type"
              className="border rounded-md p-2 w-full"
              value={item.type}
              onChange={(e) => setItem({ ...item, type: e.target.value })}
            >
              <option value="">Select</option>
              <option value="Paid">Paid</option>
              <option value="Received">Received</option>
            </select>
          </div>

          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="border rounded-md p-2 bg-green-700 text-white w-40"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExpensePopup;
