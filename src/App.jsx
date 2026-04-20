// import React, { useState, useEffect } from 'react';

// const App = () => {
//   const [todoData, setTodoData] = useState("");
//   const [todo, setTodo] = useState([]);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("Todo_Data")) || [];
//     setTodo(saved);
//   }, []);

//   const handleChange = (e) => {
//     setTodoData(e.target.value);
//   };

//   const handleSubmit = () => {
//     if (!todoData) return;

//     const newTodos = [...todo, todoData];
//     setTodo(newTodos);

//     localStorage.setItem("Todo_Data", JSON.stringify(newTodos));
//     setTodoData("");
//   };

//   const handleDelete = (index) => {
//     const updated = todo.filter((_, i) => i !== index);
//     setTodo(updated);

//     localStorage.setItem("Todo_Data", JSON.stringify(updated));
//   };

//   return (
//     <div>
//       <center>
//         <h2><u>To Do List</u></h2>

//         <input
//           type="text"
//           value={todoData}
//           onChange={handleChange}
//           placeholder="Enter task"
//         />
//         <button onClick={handleSubmit}>Add</button>

//         {/* Proper Table */}
//         <table style={{ marginTop: "20px" }}>
//           <thead>
//             <tr>
//               <th>Todo List</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {todo.map((item, index) => (
//               <tr key={index}>
//                 {/* Todo Text */}
//                 <td style={{ padding: "10px" }}>{item}</td>

//                 {/* Delete Button */}
//                 <td style={{ padding: "10px" }}>
//                   <button onClick={() => handleDelete(index)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//       </center>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';

const App = () => {
  const [todoData, setTodoData] = useState("");
  const [todo, setTodo] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("Todo_Data")) || [];
    setTodo(saved);
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!todoData.trim()) return;

    let newTodos;

    if (editIndex !== null) {
      newTodos = todo.map((item, i) =>
        i === editIndex ? todoData : item
      );
      setEditIndex(null);
    } else {
      newTodos = [todoData, ...todo];
    }
    setTodo(newTodos);
    localStorage.setItem("Todo_Data", JSON.stringify(newTodos));
    setTodoData("");
  };

  const handleEdit = (index) => {
    setTodoData(todo[index]);
    setEditIndex(index)
    //localStorage.setItem("Todo_Data", JSON.stringify(updated));
  };

  const handleDelete = (index) => {
    const updated = todo.filter((_, i) => i !== index);
    setTodo(updated);
    localStorage.setItem("Todo_Data", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">

        {/* Header */}
        <div className="bg-indigo-600 p-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">My Tasks</h2>
          <p className="text-indigo-100 text-sm mt-1">Stay organized and productive.</p>
        </div>

        <div className="p-6">
          {/* Input Area */}
          <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
            <input
              type="text"
              value={todoData}
              onChange={(e) => setTodoData(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 transition-all"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-md active:scale-95"
            >
              {editIndex !== null ? "Update" : "Add"}
            </button>

            
          </form>

          {/* List Area */}
          <div className="space-y-3">
            {todo.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-slate-400 italic">No pending tasks. Relax!</p>
              </div>
            ) : (
              todo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all"
                >
                  {/* LEFT SIDE (Task) */}
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>

                  {/* RIGHT SIDE (Buttons) */}
                  <div className="flex gap-3 items-center">

                    {/* EDIT BUTTON */}
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                    >
                      Edit
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    >
                      Delete
                    </button>

                    

                  </div>
                </div>

              ))
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between items-center">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">
            {todo.length} {todo.length === 1 ? 'Task' : 'Tasks'} Remaining
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;