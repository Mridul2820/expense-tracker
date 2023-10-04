import React from "react";

const DeleteExpensePopup = ({ popup, setPopup, deleteExpense }) => {
  return (
    <div className="u-position-fixed u-inset-0 u-width-full-line u-full-screen-height u-flex u-cross-center u-main-center u-z-index-10 lite-bg">
      <div className="card u-max-width-600 u-width-full-line">
        <p className="heading-level-3 font-bold u-text-center">
          Delete Expense
        </p>
        <div className="u-flex u-main-center u-margin-block-start-12 u-gap-12">
          <button
            className="button is-secondary"
            onClick={() => setPopup(null)}
          >
            Cancel
          </button>
          <button
            className="button"
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
