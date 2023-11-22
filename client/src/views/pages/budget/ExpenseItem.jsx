// rrd imports
import { Link } from "react-router-dom";

// library import
import { IconTrash } from "@tabler/icons-react";

// helper imports
import { formatCurrency, formatDateToLocaleString } from "./Helpers";

import budgetApi from "../../../api/budgetApi";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const ExpenseItem = ({ expense, showBudget, fetchData }) => {
  const [budget, setBudget] = useState([]);
  console.log(expense);

  const fetchingData = async () => {
    try {
      const budgetId = expense.budgetId;
      const budget = await budgetApi.getOne(budgetId);
      setBudget(budget);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);
  console.log("hey", budget);

  const handleDelete = async () => {
    //delete expense
    try {
      const result = await budgetApi.deleteExpense(budget._id, expense._id);
      fetchData();
      toast.error("Expenses Deleted !", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("Expense deleted!", result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
