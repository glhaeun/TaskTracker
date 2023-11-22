// rrd imports
import { Link } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import AddBudgetForm from "./AddBudgetForm";
import AddExpenseForm from "./AddExpenseForm";
import BudgetItem from "./BudgetItem";
import Table from "./Table";

import './style.css'

import { useEffect, useState } from "react";
import budgetApi from "../../../api/budgetApi";
import Title from "./title";

// loader

const Dashboard = () => {
  const userName = "HaEun"
  const [budgets, setBudget] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(()=> {
    fetchData();
  }, [])

  const fetchData = async()=> {
    const result = await budgetApi.getAll();
    setBudget(result);
    const result2 = await budgetApi.getAllExpenses();
    setExpenses(result2);
  }
  
  return (
    <>
        <div className="dashboard" style={{padding: '40px'}}>
          <Title></Title>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm fetchData = {fetchData}/>
                  <AddExpenseForm budgets={budgets} fetchData = {fetchData} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      fetchData = {fetchData}
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="expense" className="btn btn--dark">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm fetchData = {fetchData}/>
              </div>
            )}
          </div>
        </div>
    </>
  );
};
export default Dashboard;
