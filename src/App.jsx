import { useState } from "react";
import cross from "./images/icon-cross.svg";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState();
  const [list, setList] = useState([]);
  let completed = [];
  let tempList = [];

  const addTask = (e) => {
    setList((list) => list.concat(input));
    setInput("");
    todoList();
    e.preventDefault();
  };

  const removeTask = (task) => {
    completed.filter((x) => x !== task);
    setList((list) => list.filter((x) => x !== task));
    tempList.filter((x) => x !== task);

    setItems(tempList.map((x) => todoDiff(x)));
  };

  const todoList = () => {
    tempList = list.concat(input);
    console.log("List: " + tempList);

    setItems(tempList.map((x) => todoDiff(x)));
  };

  const todoDiff = (todo) => {
    if (completed.length === 0) {
      return (
        <li>
          <div className="bg-white p-[1rem] sm:w-[40rem] flex flex-row gap-[1rem]">
            <div className="flex flex-row gap-[1rem] basis-1/2">
              <input
                type="checkbox"
                className="cursor-pointer"
                onClick={() => completeTask(todo)}
              />
              <p key={todo}>{todo}</p>
            </div>
            <div className="flex flex-row basis-1/2 justify-end">
              <img
                src={cross}
                alt="delete"
                className="cursor-pointer"
                onClick={() => removeTask(todo)}
              />
            </div>
          </div>
          <hr />
        </li>
      );
    }

    for (let i = 0; i < completed.length; i++) {
      if (todo === completed[i]) {
        return (
          <li>
            <div className="bg-white p-[1rem] sm:w-[40rem] flex flex-row gap-[1rem]">
              <div className="flex flex-row gap-[1rem] basis-1/2">
                <input
                  type="checkbox"
                  checked
                  className="cursor-pointer"
                  onClick={() => completeTask(todo)}
                />
                <s>
                  <p key={todo}>{todo}</p>
                </s>
              </div>
              <div className="flex flex-row basis-1/2 justify-end">
                <img
                  src={cross}
                  alt="delete"
                  className="cursor-pointer"
                  onClick={() => removeTask(todo)}
                />
              </div>
            </div>
            <hr />
          </li>
        );
      } else if (i === completed.length - 1) {
        return (
          <li>
            <div className="bg-white p-[1rem] sm:w-[40rem] flex flex-row gap-[1rem]">
              <div className="flex flex-row gap-[1rem] basis-1/2">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onClick={() => completeTask(todo)}
                />
                <p key={todo}>{todo}</p>
              </div>
              <div className="flex flex-row basis-1/2 justify-end">
                <img
                  src={cross}
                  alt="delete"
                  className="cursor-pointer"
                  onClick={() => removeTask(todo)}
                />
              </div>
            </div>
            <hr />
          </li>
        );
      }
    }
  };

  const completeTask = (task) => {
    if (completed.indexOf(task) !== -1) {
      completed.splice(completed.indexOf(task), 1);
      console.log("Completed: " + completed);
      todoList();
    } else {
      completed.push(task);
      console.log("Completed: " + completed);
      todoList();
    }
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
