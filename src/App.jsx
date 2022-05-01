import { useState } from "react";
import cross from "./images/icon-cross.svg";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState();
  const [list, setList] = useState([]);
  const [cList, setCompleted] = useState([]);
  let completed = [];
  let tempList = [];

  const addTask = (e) => {
    tempList = list;
    tempList.push(input);
    setList(tempList);
    setInput("");
    renderItems();
    e.preventDefault();
  };

  const completeTask = (task) => {
    completed = cList;
    if (completed.indexOf(task) !== -1) {
      completed.splice(completed.indexOf(task), 1);
      setCompleted(completed);
      renderItems();
    } else {
      completed.push(task);
      setCompleted(completed);
      renderItems();
    }
  };

  const removeTask = (task) => {
    setList((list) => list.filter((x) => x !== task));
    setCompleted((cList) => cList.filter((x) => x !== task));
    tempList.filter((x) => x !== task);
    completed.filter((x) => x !== task);
    for (let i = 0; i < cList.length; i++) {
      if (list.indexOf(cList[i]) !== -1) {
        setCompleted((completed) =>
          completed.splice(list.indexOf(completed[i]), 1)
        );
        completed = cList;
      }
    }
    //try using debugger(); here
    debugger;
    renderItems();
  };

  const renderItems = () => {
    setItems(tempList.map((x) => todoDiff(x)));
  };

  const todoDiff = (todo) => {
    if (cList.length === 0) {
      return (
        <li key={todo}>
          <div className="bg-white p-[1rem] sm:w-[40rem] flex flex-row gap-[1rem]">
            <div className="flex flex-row gap-[1rem] basis-1/2">
              <input
                type="checkbox"
                className="cursor-pointer"
                onClick={() => completeTask(todo)}
              />
              <p>{todo}</p>
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

    for (let i = 0; i < cList.length; i++) {
      if (todo === cList[i]) {
        return (
          <li key={todo}>
            <div className="bg-white p-[1rem] sm:w-[40rem] flex flex-row gap-[1rem]">
              <div className="flex flex-row gap-[1rem] basis-1/2">
                <input
                  type="checkbox"
                  checked
                  className="cursor-pointer"
                  onClick={() => completeTask(todo)}
                />
                <s>
                  <p>{todo}</p>
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
      } else if (i === cList.length - 1) {
        return (
          <li key={todo}>
            <div className="bg-white p-[1rem] sm:w-[40rem] flex flex-row gap-[1rem]">
              <div className="flex flex-row gap-[1rem] basis-1/2">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onClick={() => completeTask(todo)}
                />
                <p>{todo}</p>
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
