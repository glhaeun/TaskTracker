
// library import
import { toast } from "react-toastify";
import budgetApi from '../../../api/budgetApi';

// component imports
import Table from "./Table";
import { useEffect, useState } from "react";

// helpers


const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchData = async()=> {
    const result = await budgetApi.getAllExpenses();
    setExpenses(result)
  }

  useEffect(()=> {
    fetchData();
  }, [])

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} fetchData={fetchData} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
