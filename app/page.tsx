// "use client";

// import React from "react";
// import Form from "./src/components/animatedform";

// export default function Page() {
//   return <Form />;
// }
"use client";

import React, { useRef } from "react";
import Form from "./src/components/animatedform";      // Your animated form
import ExpenseTracker from "./src/components/Expensetracker"; // Expense Tracker component

export default function Page() {
  const formRef = useRef(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-pink-100 via-purple-200 to-indigo-200 py-12 px-6 gap-12">
      {/* Animated Student Registration Form */}
      <Form ref={formRef} />

      {/* Expense Tracker below */}
      <ExpenseTracker />
    </div>
  );
}
