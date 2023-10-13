"use client";

import React from "react";
import toast from "react-hot-toast";

const EditExpensePopup = ({
  title,
  amount,
  type,
  docId,
  setPopup,
  editExpense,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const item = {
      docId,
      title: formData.get("title"),
      amount: formData.get("amount"),
      type: formData.get("type"),
    };

    if (!item.title) {
      return toast.error("Title is required");
    }
    if (!item.amount) {
      return toast.error("Amount is required");
    }
    if (!item.type) {
      return toast.error("Type is required");
    }

    try {
      await editExpense(item);
    } catch (error) {
      toast.error(error.message);
    }
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
          Update Expense
        </p>
        <form className="u-margin-block-start-12" onSubmit={handleSubmit}>
          <div>
            <label className="label">Title</label>
            <div className="input-text-wrapper">
              <input
                className="input-text"
                placeholder="Title"
                name="title"
                type="text"
                required
                defaultValue={title}
              />
            </div>
          </div>
          <div className="u-margin-block-start-12">
            <label className="label">Amount($)</label>
            <div className="input-text-wrapper">
              <input
                className="input-text"
                placeholder="Title"
                name="amount"
                type="number"
                required
                min="0"
                defaultValue={amount}
              />
            </div>
          </div>
          <div className="u-margin-block-start-12">
            <label className="label">Type</label>
            <div className="input-text-wrapper">
              <select name="type" className="input-text" defaultValue={type}>
                <option value="">Select</option>
                <option value="Paid">Paid</option>
                <option value="Received">Received</option>
              </select>
            </div>
          </div>
          <div className="u-margin-block-start-12">
            <button type="submit" className="button">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpensePopup;
