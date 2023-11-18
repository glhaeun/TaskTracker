// component import
import ExpenseItem from "./ExpenseItem";

const Table = ({ expenses, showBudget = true, fetchData }) => {
  return (
    <div className="table" id="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map(
              (i, index) => (
                <th key={index}>{i}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <ExpenseItem expense={expense} showBudget={showBudget} fetchData={fetchData} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
