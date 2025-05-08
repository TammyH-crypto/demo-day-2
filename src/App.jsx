import { useEffect, useState } from "react";
import "./App.css";
import { createToDo, scanTodo } from "./dynamo";


function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
     scanTodo().then(setTodos)
  }
   ,[]
)

  async function handleAdd() {
    const newItem = { id: crypto.randomUUID(), input };
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
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <button onClick={handleAdd}>New</button>
      <ul>
        {todos.map((todoItem) => (<li key={todoItem.id}>{todoItem.input}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
