import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState();
  const [list, setList] = useState([]);

  const addTask = (e) => {
    let tempList = list.concat(input);
    setList((list) => list.concat(input));
    console.log(tempList);

    setItems(
      tempList.map((x) => (
        <div>
          <div className="bg-white p-[1rem] sm:w-[40rem] flex flex-row gap-[1rem]">
            <input type="checkbox" onClick={() => completeTask(x)} />
            <li key={x}>{x}</li>
          </div>
          <hr />
        </div>
      ))
    );

    setInput("");

    e.preventDefault();
  };

  const completeTask = (task) => {
    return (
      <div>
        <div className="bg-white p-[1rem] sm:w-[40rem] flex flex-row gap-[1rem]">
          <s>
            <input type="checkbox" onClick={() => completeTask(task)} />
            <li key={task}>{task}</li>
          </s>
        </div>
        <hr />
      </div>
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
            value={input}
            onChange={(x) => setInput(x.target.value)}
            placeholder="Add a task"
          ></input>
        </form>
        <div className="rounded-sm">
          <ul>{items}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
