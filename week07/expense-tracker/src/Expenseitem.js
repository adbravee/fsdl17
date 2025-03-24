import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

function ExpenseItem({ expense, deleteExpense }) {
  return (
    <div className="expense-item">
      <span>{expense.description}</span>
      <span>${expense.amount.toFixed(2)}</span>
      <button onClick={() => deleteExpense(expense.id)}><FaTrashAlt /></button>
    </div>
  );
}

export default ExpenseItem;
