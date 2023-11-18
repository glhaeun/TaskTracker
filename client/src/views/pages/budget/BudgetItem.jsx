import { Link } from "react-router-dom";
import budgetApi from "../../../api/budgetApi";

import { IconTrash } from '@tabler/icons-react';

import {
  formatCurrency,
  formatPercentage,
} from "./Helpers";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const BudgetItem = ({ budget, showDelete = false, onDeleteClick }) => {

  const { _id, name, amount, color } = budget;
  const [totalExpenses, setTotalExpenses] = useState(0);

  const fetchData = async(budget)=> {
    const budgetId = budget._id
    const result = await budgetApi.getOne(budgetId);
    const calculatedExpenses = calculateTotalExpenses(result);
    setTotalExpenses(calculatedExpenses);
    console.log('Total expenses amount:', totalExpenses);
  }

  useEffect(()=> {
    fetchData(budget);
  }, [budget])



  const calculateTotalExpenses = (data) => {
    let totalAmount = 0;

    if (data && data.expenses && Array.isArray(data.expenses)) {
        totalAmount = data.expenses.reduce((total, expense) => {
            if (expense.amount && typeof expense.amount === 'number') {
                return total + expense.amount;
            }
            return total; 
        }, 0);
    } else if (data && data.amount && typeof data.amount === 'number') {
        totalAmount += data.amount;
    }

    return totalAmount;
};

  
  

  const handleDeleteClick = () => {
    onDeleteClick(_id);
    console.log("first")
    navigate('/budget')
  };

  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={totalExpenses}>
        {formatPercentage(totalExpenses / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(totalExpenses)} spent</small>
        <small>{formatCurrency(amount - totalExpenses)} remaining</small>
      </div>
      {showDelete ? (
        <Button onClick={handleDeleteClick}>
        <IconTrash width={20} />
        </Button>
      ) : (
        <div className="flex-sm">
          <Link to={{
              pathname: `/budget/${_id}`,
              state: { budget }
            }} className="btn">
            <span>View Details</span>
            <IconTrash width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};
export default BudgetItem;
