// library
import { toast } from "react-toastify";

// components
import AddExpenseForm from "./AddExpenseForm";
import BudgetItem from "./BudgetItem";
import Table from "./Table";

// helpers
import { useParams  } from "react-router-dom";
import { useEffect, useState } from "react";
import budgetApi from '../../../api/budgetApi';



async function fetchData(budgetId, setBudget, setExpenses, setCheckBudget) {
  try {
    console.log(budgetId)
    const result = await budgetApi.getOne(budgetId);
    setBudget(result);
    if (result) {
      setExpenses(result.expenses || []); // Adjust based on your API response structure
    }
    console.log("first")
    setCheckBudget(true)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const BudgetPage = () => {

  const [budget, setBudget] = useState([]);
  const [checkBudget, setCheckBudget] = useState(false);
  const { budgetId } = useParams()
  console.log(budgetId)

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!budgetId) {
      navigate('/budget');
    }

    fetchData(budgetId, setBudget, setExpenses, setCheckBudget);
  }, []);

  const onDeleteClick = async () => {
    //delete budget
    try{
      await budgetApi.delete(budgetId);
    } catch(error) {

    }
  }

  const fetchExpenses = async () => {
    const result = await budgetApi.getAllExpenses();
    setExpenses(result);
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
      {checkBudget != [] && (
        <>
          <BudgetItem budget={budget} showDelete={true} onDeleteClick={onDeleteClick} />
          <AddExpenseForm budgets={[budget]} fetchData={fetchExpenses} />
        </>
      )}
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} fetchData={fetchExpenses}/>
        </div>
      )}
    </div>
  );
};
export default BudgetPage;
