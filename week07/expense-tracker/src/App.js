// Remove the extra React import here
import { useState } from 'react';  // Only import useState from React
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import Total from './Total';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseForm addExpense={addExpense} />
      <Total expenses={expenses} />
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
    </div>
  );
}

export default App;
