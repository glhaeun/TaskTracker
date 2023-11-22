// rrd imports
import { Link } from "react-router-dom";

// library import
import { IconTrash } from "@tabler/icons-react";

// helper imports
import {
  formatCurrency,
  formatDateToLocaleString,
} from "./Helpers";

import budgetApi from "../../../api/budgetApi";
import { useEffect, useState } from "react";

const ExpenseItem = ({ expense, showBudget, fetchData }) => {
  const [budget, setBudget] = useState([])
  console.log(expense)

  const fetchingData = async() => {
    try{
      const budgetId = expense.budgetId
      const budget = await budgetApi.getOne(budgetId);
      setBudget(budget)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    fetchingData()
  },[])
  console.log("hey", budget)

  const handleDelete = async () => {
    //delete expense
    try {
      const result = await budgetApi.deleteExpense(budget._id, expense._id)
      fetchData()
      console.log('Expense deleted!', result);
    } catch (err){
      console.log(err)
    }
  };


  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget._id}`}
            style={{
              "--accent": budget.color,
            }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td onClick={handleDelete}>
        <IconTrash width={20} />
      </td>
    </>
  );
};
export default ExpenseItem;
