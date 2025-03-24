import React, { useState } from 'react';

function Todoinput({ addTodo }) {
  const [todoText, setTodoText] = useState('');

  const handleChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim()) {
      addTodo(todoText);
      setTodoText(''); // Reset the input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoText}
        onChange={handleChange}
        placeholder="Add a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default Todoinput;
