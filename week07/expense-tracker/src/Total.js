import React from 'react';

function Total({ expenses }) {
  const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <div className="total">
      <h2>Total Expenses: ${totalAmount.toFixed(2)}</h2>
    </div>
  );
}

export default Total;
