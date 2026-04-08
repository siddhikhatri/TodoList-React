import React, { useState, useEffect } from 'react';

const App = () => {
  const [todoData, setTodoData] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("Todo_Data")) || [];
    setTodo(saved);
  }, []);

  const handleChange = (e) => {
    setTodoData(e.target.value);
  };

  const handleSubmit = () => {
    if (!todoData) return;

    const newTodos = [...todo, todoData];
    setTodo(newTodos);

    localStorage.setItem("Todo_Data", JSON.stringify(newTodos));
    setTodoData("");
  };

  const handleDelete = (index) => {
    const updated = todo.filter((_, i) => i !== index);
    setTodo(updated);

    localStorage.setItem("Todo_Data", JSON.stringify(updated));
  };

  return (
    <div>
      <center>
        <h2><u>To Do List</u></h2>

        <input
          type="text"
          value={todoData}
          onChange={handleChange}
          placeholder="Enter task"
        />
        <button onClick={handleSubmit}>Add</button>

        {/* Proper Table */}
        <table style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Todo List</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {todo.map((item, index) => (
              <tr key={index}>
                {/* Todo Text */}
                <td style={{ padding: "10px" }}>{item}</td>

                {/* Delete Button */}
                <td style={{ padding: "10px" }}>
                  <button onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </center>
    </div>
  );
};

export default App;