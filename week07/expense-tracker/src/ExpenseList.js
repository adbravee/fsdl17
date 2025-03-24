import React from 'react';
import ExpenseItem from './Expenseitem';

function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div className="expense-list">
      {expenses.length === 0 ? (
        <p>No expenses added yet</p>
      ) : (
        expenses.map(expense => (
          <ExpenseItem key={expense.id} expense={expense} deleteExpense={deleteExpense} />
        ))
      )}
    </div>
  );
}

export default ExpenseList;
