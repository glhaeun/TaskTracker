// library
import { toast } from "react-toastify";

// components
import AddExpenseForm from "./AddBudgetForm";
import BudgetItem from "./BudgetItem";
import Table from "./Table";

// helpers
import { createExpense, deleteItem, getAllMatchingItems } from "./Helpers";
import { dummyBudget, dummyExpenses } from './dummy'; // Update the path to your dummy data file
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import budgetApi from '../../../api/budgetApi';

// loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

async function fetchData(budgetId, setBudget, setExpenses) {
  try {
    const result = await budgetApi.getOne(budgetId);
    setBudget(result);
    if (result) {
      setExpenses(result.expenses || []); // Adjust based on your API response structure
    }
    console.log("first")
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


const BudgetPage = () => {

  const [budget, setBudget] = useState([]);
  const { budgetId } = useParams()


  const [expenses, setExpenses] = useState([]);
  // const expenses = dummyExpenses;

  useEffect(() => {
    if(!budgetId) {
      navigate('/budget');
    }
    console.log("hi");
    fetchData(budgetId, setBudget, setExpenses);
  }, [budgetId]);

  const onDeleteClick = async () => {
    try{
      await budgetApi.delete(budgetId);
    } catch(error) {

    }
  }

  
  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} onDeleteClick={onDeleteClick} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};
export default BudgetPage;
