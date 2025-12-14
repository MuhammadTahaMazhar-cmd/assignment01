// import React, { useState } from "react";
// import ExpenseList from "./ExpenseList";

// const ExpenseTracker = () => {
//   const [expenseForm, setExpenseForm] = useState({ title: "", amount: "", category: "", date: "" });
//   const [expenses, setExpenses] = useState([]);

//   const handleChange = (e) => { const { name, value } = e.target; setExpenseForm(prev => ({ ...prev, [name]: value })); };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!expenseForm.title || !expenseForm.amount) return;
//     setExpenses(prev => [...prev, expenseForm]);
//     setExpenseForm({ title: "", amount: "", category: "", date: "" });
//   };

//   return (
//     <div className="w-full max-w-3xl bg-white/90 rounded-3xl  text-black shadow-2xl p-8 md:p-10">
//       <h2 className="text-3xl font-extrabold text-black text-center mb-6">Expense Tracker</h2>
//       <form onSubmit={handleSubmit} className=" text-black grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input type="text" name="title" value={expenseForm.title} onChange={handleChange} placeholder="Title" className="px-3 py-2 rounded-xl border text-black "/>
//         <input type="number" name="amount" value={expenseForm.amount} onChange={handleChange} placeholder="Amount" className="px-3 py-2 rounded-xl  text-black border"/>
//         <select name="category" value={expenseForm.category} onChange={handleChange} className="px-3 py-2 rounded-xl border">
//           <option value="">Category</option>
//           <option value="Food">Food</option>
//           <option value="Transport">Transport</option>
//           <option value="Shopping">Shopping</option>
//           <option value="Other">Other</option>
//         </select>
//         <input type="date" name="date" value={expenseForm.date} onChange={handleChange} className="px-3 py-2 rounded-xl border"/>
//         <button type="submit" className="col-span-1 md:col-span-2 px-6 py-2 rounded-xl bg-purple-500 text-black">Add Expense</button>
//       </form>

//       <ExpenseList expenses={expenses} />
//     </div>
//   );
// };

// export default ExpenseTracker;


import React, { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";

const ExpenseTracker = () => {
  const [expenseForm, setExpenseForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });

  // Initialize expenses from localStorage safely (Lazy initialization)
  const [expenses, setExpenses] = useState(() => {
    try {
      const stored = localStorage.getItem("expenses");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
      return [];
    } catch (err) {
      console.error("LocalStorage parse error:", err);
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState(null);

  // SAVE to LocalStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseForm((prev) => ({ ...prev, [name]: value }));
  };

  // CREATE or UPDATE expense
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expenseForm.title || !expenseForm.amount) return;

    const newExpense = {
      title: expenseForm.title,
      amount: Number(expenseForm.amount),
      category: expenseForm.category,
      date: expenseForm.date
    };

    if (editIndex === null) {
      // CREATE
      setExpenses((prev) => [...prev, newExpense]);
    } else {
      // UPDATE
      const updated = [...expenses];
      updated[editIndex] = newExpense;
      setExpenses(updated);
      setEditIndex(null);
    }

    setExpenseForm({ title: "", amount: "", category: "", date: "" });
  };

  // DELETE expense
  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  // EDIT expense
  const editExpense = (index) => {
    const exp = expenses[index];
    if (!exp) return;

    setExpenseForm({
      title: exp.title || "",
      amount: exp.amount || "",
      category: exp.category || "",
      date: exp.date || ""
    });

    setEditIndex(index);
  };

  return (
    <div className="w-full  text-black max-w-3xl bg-white/90 rounded-3xl shadow-2xl p-8 md:p-10">
      <h2 className="text-3xl font-extrabold text-center mb-6">
        Expense Tracker
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={expenseForm.title}
          onChange={handleChange}
          placeholder="Title"
          className="px-3 py-2 text-black  rounded-xl border"
        />

        <input
          type="number"
          name="amount"
          value={expenseForm.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="px-3 py-2  text-black rounded-xl border"
        />

        <select
          name="category"
          value={expenseForm.category}
          onChange={handleChange}
          className="px-3 py-2 rounded-xl border"
        >
          <option value="">Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="date"
          name="date"
          value={expenseForm.date}
          onChange={handleChange}
          className="px-3 py-2 rounded-xl border"
        />

        <button
          type="submit"
          className="col-span-1 md:col-span-2 px-6 py-2 rounded-xl bg-purple-500 text-white"
        >
          {editIndex === null ? "Add Expense" : "Update Expense"}
        </button>
      </form>

      <ExpenseList
        expenses={expenses}
        onEdit={editExpense}
        onDelete={deleteExpense}
      />
    </div>
  );
};

export default ExpenseTracker;
