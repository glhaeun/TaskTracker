// rrd imports
import { Link } from "react-router-dom";

// library import
import { IconTrash } from "@tabler/icons-react";

// helper imports
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "./Helpers";

import {  dummyBudget, dummyExpenses } from './dummy'; // Update the path to your dummy data file
import budgetApi from "../../../api/budgetApi";
import { useEffect, useState } from "react";

const ExpenseItem = ({ expense, showBudget }) => {
  const [budget, setBudget] = useState([])
  console.log(expense)
  // const budget = getAllMatchingItems(dummyBudget, 'id', expense.budgetId)[0];

  const fetchData = async() => {
    try{
      const budgetId = expense.budgetId
      const budget = await budgetApi.getOne(budgetId);
      setBudget(budget)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    fetchData()
  },[])
  console.log("hey", budget)

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
      <td>
      <IconTrash width={20} />
      </td>
    </>
  );
};
export default ExpenseItem;
