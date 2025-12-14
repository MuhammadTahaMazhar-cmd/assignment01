// import React from "react";

// const ExpenseList = ({ expenses }) => {
//   if (!expenses.length) return <p className="mt-4">No expenses yet.</p>;

//   return (
//     <ul className="mt-4 space-y-2">
//       {expenses.map((exp, i) => (
//         <li key={i} className="p-4 bg-white rounded-xl shadow border flex justify-between">
//           <div>
//             <p><strong>Title:</strong> {exp.title}</p>
//             <p><strong>Amount:</strong> ${exp.amount}</p>
//             <p><strong>Category:</strong> {exp.category}</p>
//             <p><strong>Date:</strong> {exp.date}</p>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default ExpenseList;


import React from "react";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (!expenses.length) {
    return <p className="mt-4 text-center text-gray-500">No expenses yet.</p>;
  }

  return (
    <ul className="mt-6 space-y-3">
      {expenses.map((exp, i) => (
        <li
          key={i}
          className="p-4 bg-white rounded-xl shadow border flex justify-between items-center"
        >
          <div>
            <p><strong>Title:</strong> {exp.title}</p>
            <p><strong>Amount:</strong> Rs {exp.amount}</p>
            <p><strong>Category:</strong> {exp.category}</p>
            <p><strong>Date:</strong> {exp.date}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(i)}
              className="px-3 py-1 bg-yellow-400 rounded-lg"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(i)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;

