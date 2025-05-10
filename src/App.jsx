import { useEffect, useState } from "react";
import "./App.css";
import { createToDo, deleteTodo, scanTodo, toggleDone } from "./dynamo";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    scanTodo().then(setTodos);
  }, []);

  async function handleToggle(todo) {
    const flipped = !todo.completed;
    toggleDone(todo.id, flipped);
    setTodos((prev) =>
      prev.map((item) =>
        item.id === todo.id ? { ...item, completed: flipped } : item
      )
    );
  }

  async function handleDelete(id) {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((item) => item.id != id));
  }

  async function handleAdd() {
    const newItem = { id: crypto.randomUUID(), input, completed: false };
    await createToDo(newItem);
    setTodos((prev) => [...prev, newItem]);
    setInput("");
  }

  return (
    <>
      <h1>Todo App</h1>
      <label>
        <input
          type="text"
          value={input}
          name="todo"
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <button onClick={handleAdd}>Add</button>

      <ul >
        {todos.map((todoItem) => (
          <li style={{}} key={todoItem.id}>
            {todoItem.input}
            <button onClick={() => handleDelete(todoItem.id)}>X</button>

            <input
              onChange={() => handleToggle(todoItem)}
              checked={todoItem.completed}
              type="checkbox"
              name=""
              id=""
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
