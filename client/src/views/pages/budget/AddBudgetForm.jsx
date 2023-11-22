import { useState, useEffect, useRef } from "react";
import { Form } from "react-router-dom";
import { Icon123 } from '@tabler/icons-react';
import budgetApi from "../../../api/budgetApi";
import { ToastContainer, toast } from "react-toastify";

const AddBudgetForm = ({fetchData}) => {
  const [newBudget, setNewBudget] = useState("");
  const [newBudgetAmount, setNewBudgetAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("newBudget", newBudget);
      formData.append("newBudgetAmount", newBudgetAmount);
      formData.append("_action", "createBudget");

      const budget = {
        name : newBudget,
        amount: newBudgetAmount
      }
      await budgetApi.create({budget})
      fetchData();

      toast.success("Add Budget Success !", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setNewBudget("");
      setNewBudgetAmount("");
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <form method="post" className="grid-sm" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
            value={newBudgetAmount}
            onChange={(e) => setNewBudgetAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Create budget</span>
              <Icon123 width={20} />
            </>
          )}
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default AddBudgetForm;
