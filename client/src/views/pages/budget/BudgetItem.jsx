// rrd imports
import { Link, useNavigate } from "react-router-dom";

// library imports
import { IconTrash } from '@tabler/icons-react';

// helper functions
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "./Helpers";
import { Button } from "@mui/material";
import { useEffect } from "react";

const BudgetItem = ({ budget, showDelete = false, onDeleteClick }) => {
  const navigate = useNavigate();

  const { id, name, amount, color } = budget;
  
  const spent = calculateSpentByBudget(id);

  const handleDeleteClick = () => {
    onDeleteClick(id);
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
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      {showDelete ? (
        <Button onClick={handleDeleteClick}>
        <IconTrash width={20} />
        </Button>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <IconTrash width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};
export default BudgetItem;
