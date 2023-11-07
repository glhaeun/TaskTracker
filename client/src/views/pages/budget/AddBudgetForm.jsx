import { useState, useEffect, useRef } from "react";
import { Form } from "react-router-dom";
import { Icon123 } from '@tabler/icons-react';
import budgetApi from "../../../api/budgetApi";

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
      // Perform your form submission here
      const formData = new FormData();
      formData.append("newBudget", newBudget);
      formData.append("newBudgetAmount", newBudgetAmount);
      formData.append("_action", "createBudget");

      // Replace the following with your actual submission logic
      const budget = {
        name : newBudget,
        amount: newBudgetAmount
      }
      await budgetApi.create({budget})
      fetchData();
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
    </div>
  );
};

export default AddBudgetForm;
