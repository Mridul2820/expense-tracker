import React, { useState } from "react";
import toast from "react-hot-toast";

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
    <div className="u-position-fixed u-inset-0 u-width-full-line u-full-screen-height u-flex u-cross-center u-main-center u-z-index-10 lite-bg">
      <div className="card u-max-width-600 u-width-full-line">
        <button
          onClick={() => setPopup(null)}
          className="u-position-absolute u-inset-inline-end-16 u-inset-block-start-16"
        >
          <span className="icon-x-circle" />
        </button>
        <p className="heading-level-3 font-bold u-text-center">
          Create Expense
        </p>
        <form className="u-margin-block-start-12" onSubmit={handleSubmit}>
          <div>
            <label className="label">Title</label>
            <div className="input-text-wrapper">
              <input
                className="input-text"
                placeholder="Title"
                id="title"
                type="text"
                required={true}
                value={item.title}
                onChange={(e) => setItem({ ...item, title: e.target.value })}
              />
            </div>
          </div>
          <div className="u-margin-block-start-12">
            <label className="label">Amount($)</label>
            <div className="input-text-wrapper">
              <input
                className="input-text"
                placeholder="Title"
                id="amount"
                type="number"
                required={true}
                min="0"
                value={item.amount}
                onChange={(e) => setItem({ ...item, amount: e.target.value })}
              />
            </div>
          </div>
          <div className="u-margin-block-start-12">
            <label className="label">Type</label>
            <div className="input-text-wrapper">
              <select
                id="type"
                className="input-text"
                value={item.type}
                onChange={(e) => setItem({ ...item, type: e.target.value })}
              >
                <option value="">Select</option>
                <option value="Paid">Paid</option>
                <option value="Received">Received</option>
              </select>
            </div>
          </div>
          <div className="u-margin-block-start-12">
            <button type="submit" className="button">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExpensePopup;
