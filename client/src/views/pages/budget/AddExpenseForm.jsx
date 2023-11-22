import { useEffect, useRef, useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import budgetApi from "../../../api/budgetApi";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

const AddExpenseForm = ({ budgets, fetchData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newExpense, setNewExpense] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [newExpenseBudget, setNewExpenseBudget] = useState(budgets[0].id);
  const [expense, setExpense] = useState([]);
  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      // Clear form
      formRef.current.reset();
      // Reset focus
      focusRef.current.focus();
    }
    fetchExpense(newExpenseBudget);
  }, [isSubmitting, newExpenseBudget]);

  const fetchExpense = async (newExpenseBudget) => {
    try {
      const res = await budgetApi.getOne(newExpenseBudget);
      setExpense(res.expenses);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(newExpenseBudget);

    try {
      const formData = new FormData();
      formData.append("newExpense", newExpense);
      formData.append("newExpenseAmount", newExpenseAmount);
      formData.append("newExpenseBudget", newExpenseBudget);
      formData.append("_action", "createExpense");
      const newExpenseId = uuidv4();

      const newData = {
        id: newExpenseId,
        name: newExpense,
        amount: newExpenseAmount,
        budgetId: newExpenseBudget,
        createdAt: new Date(),
      };

      // add expense
      const budgetId = newExpenseBudget;
      await budgetApi.addExpenses(budgetId, {
        expenses: [...expense, newData],
      });

      toast.success("Expense Added !", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      fetchData();
      setNewExpense("");
      setNewExpenseAmount("");
      setNewExpenseBudget(budgets.length === 1 ? budgets[0].id : "");
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && budgets[0].name}
        </span>{" "}
        Expense
      </h2>
      <form
        method="post"
        className="grid-sm"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              required
              ref={focusRef}
              value={newExpense}
              onChange={(e) => setNewExpense(e.target.value)}
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 3.50"
              required
              value={newExpenseAmount}
              onChange={(e) => setNewExpenseAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select
            name="newExpenseBudget"
            id="newExpenseBudget"
            required
            value={newExpenseBudget}
            onChange={(e) => setNewExpenseBudget(e.target.value)}
          >
            {budgets.map((budget) => (
              <option key={budget.id} value={budget.id}>
                {budget.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Add Expense</span>
              <IconCirclePlus width={20} />
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

export default AddExpenseForm;
