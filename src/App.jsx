import { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [items, setItems] = useState();

  const addTask = (e) => {
    e.preventDefault();
    setList(list.concat(input));
    console.log(list);

    setItems(
      list.map((x) => (
        <div>
          <li key={x}>{x}</li>
        </div>
      ))
    );
  };

  return (
    <div className="App">
      <div className="bg-amber-600 h-screen flex flex-col justify-center items-center">
        <h1>Todo App</h1>
        <form onSubmit={(e) => addTask(e)}>
          <input
            type="text"
            name="name"
            onChange={(x) => setInput(x.target.value)}
            placeholder="Add a task"
          ></input>
        </form>
        <ul>{items}</ul>
      </div>
    </div>
  );
}

export default App;
