import React from "react";

const ExpenseList = ({ expenses }) => {
  if (!expenses.length) return <p className="mt-4">No expenses yet.</p>;

  return (
    <ul className="mt-4 space-y-2">
      {expenses.map((exp, i) => (
        <li key={i} className="p-4 bg-white rounded-xl shadow border flex justify-between">
          <div>
            <p><strong>Title:</strong> {exp.title}</p>
            <p><strong>Amount:</strong> ${exp.amount}</p>
            <p><strong>Category:</strong> {exp.category}</p>
            <p><strong>Date:</strong> {exp.date}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
