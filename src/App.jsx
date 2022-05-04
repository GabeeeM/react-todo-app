import { useState } from "react";
import cross from "./images/icon-cross.svg";
import sunButton from "./images/icon-sun.svg";
import moonButton from "./images/icon-moon.svg";
import lightBg from "./images/bg-desktop-light.jpg";
import darkBg from "./images/bg-desktop-dark.jpg";
import "./App.css";

function App() {
  const lightTheme = [
    {
      background: "url(" + moonButton + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "3rem 3rem",
    }, //moon theme button [0]
    {
      backgroundColor: "#fafafa",
      backgroundImage: "url(" + lightBg + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% auto",
    }, //background image light [1]
    {
      backgroundColor: "#fafafa",
    }, //task background light [2]
  ];

  const darkTheme = [
    {
      background: "url(" + sunButton + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "3rem 3rem",
    }, //sun theme button [0]
    {
      backgroundColor: "#181824",
      backgroundImage: "url(" + darkBg + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% auto",
    }, //background image dark [1]
    {
      backgroundColor: "#181824",
    }, //task background dark [2]
  ];

  const [input, setInput] = useState("");
  const [items, setItems] = useState();
  const [list, setList] = useState([]);
  const [cList, setCompleted] = useState([]);
  const [theme, setTheme] = useState(lightTheme);
  let completed = [];
  let tempList = [];
  let gounter = 0;

  const addTask = (e) => {
    if (list.length < 10) {
      tempList = list;
      tempList.push(input);
      setList(tempList);
      setInput("");
      renderItems();
      e.preventDefault();
    } else {
      console.log("max amount of tasks reached");
      e.preventDefault();
    }
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

  const changeTheme = () => {
    gounter++;
    if (gounter === 1) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
      gounter = 0;
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
    let key = Math.random();
    if (cList.length === 0) {
      return (
        <li key={key}>
          <div
            className="p-[1rem] sm:w-[40rem] flex flex-row gap-[1rem]"
            style={theme[2]}
          >
            <div className="flex flex-row gap-[1rem] basis-1/2">
              <input
                type="checkbox"
                className="cursor-pointer"
                onClick={() => completeTask(key)}
              />
              <p>{todo}</p>
            </div>
            <div className="flex flex-row basis-1/2 justify-end">
              <img
                src={cross}
                alt="delete"
                className="cursor-pointer"
                onClick={() => removeTask(key)}
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
          <li key={key}>
            <div
              className="p-[1rem] sm:w-[40rem] flex flex-row gap-[1rem]"
              style={theme[2]}
            >
              <div className="flex flex-row gap-[1rem] basis-1/2">
                <input
                  type="checkbox"
                  checked
                  className="cursor-pointer"
                  onClick={() => completeTask(key)}
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
          <li key={key}>
            <div
              className="p-[1rem] sm:w-[40rem] flex flex-row gap-[1rem]"
              style={theme[2]}
            >
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
      <div className="h-screen flex flex-col items-center" style={theme[1]}>
        <div className="flex flex-col justify-content-center">
          <div className="flex flex-row mb-[2rem] mt-[6rem]">
            <div className="basis-1/2 text-left text-[3rem] text-white">
              <h1>T O D O</h1>
            </div>
            <div className="basis-1/2 mt-[1rem]">
              <div
                className="h-[3rem] w-[3rem] float-right cursor-pointer"
                onClick={() => changeTheme()}
                style={theme[0]}
              />
            </div>
          </div>
          <div className="sm:w-[40rem]">
            <form onSubmit={(e) => addTask(e)}>
              <input
                className="sm:w-[40rem] p-[1rem] mb-[2rem]"
                style={theme[2]}
                type="text"
                name="name"
                value={input}
                onChange={(x) => setInput(x.target.value)}
                placeholder="Add a task"
              ></input>
            </form>
          </div>
          <div className="rounded-sm shadow-lg">
            <ul>{items}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
