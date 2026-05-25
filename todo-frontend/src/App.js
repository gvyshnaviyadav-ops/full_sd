import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const API = "/api/todos/";

  // GET todos
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // ADD todo
  const addTodo = () => {
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then(res => res.json())
      .then(newTodo => {
        setTodos([...todos, newTodo]);
        setTitle("");
      });
  };

  // DELETE todo
  const deleteTodo = (id) => {
    fetch(`${API}${id}/`, {
      method: "DELETE",
    }).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  // EDIT todo
  const editTodo = (id) => {
    const newTitle = prompt("Enter new title:");
    if (!newTitle) return;

    fetch(`${API}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    })
      .then(res => res.json())
      .then(updated => {
        setTodos(
          todos.map(todo =>
            todo.id === id ? updated : todo
          )
        );
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => editTodo(todo.id)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;