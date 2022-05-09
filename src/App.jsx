import { useState } from "react";
import cross from "./images/icon-cross.svg";
// import check from "./images/icon-check.svg";
import sunButton from "./images/icon-sun.svg";
import moonButton from "./images/icon-moon.svg";
import lightBg from "./images/bg-desktop-light.jpg";
import darkBg from "./images/bg-desktop-dark.jpg";
import "./App.css";

function App() {
  const lightTheme = [
    {
      background: "url(" + moonButton + ")",
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
      backgroundSize: "3rem 3rem",
    }, //sun theme button [0]
    {
      backgroundColor: "#181824",
      backgroundImage: "url(" + darkBg + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% auto",
    }, //background image dark [1]
    {
      backgroundColor: "#25273c",
    }, //task background dark [2]
  ];

  const [input, setInput] = useState("");
  const [items, setItems] = useState();
  const [list, setList] = useState([]);
  const [theme, setTheme] = useState(lightTheme);
  const [counter, setCounter] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  let tempList = [];

  const addTask = (e) => {
    if (list.length < 10) {
      tempList = list;
      tempList.push({
        task: input,
        key: Math.floor(Math.random() * 9999),
        completed: false,
      });
      setList(tempList);
      setInput("");
      setTaskCount((task) => task + 1);
      renderItems();
      e.preventDefault();
    } else {
      console.log("max amount of tasks reached");
      e.preventDefault();
    }
  };

  const completeTask = (key) => {
    console.log(key);
    for (let i = 0; i < list.length; i++) {
      if (list[i].key === key) {
        if (list[i].completed) {
          list[i].completed = false;
          setTaskCount((task) => task + 1);
          break;
        } else {
          list[i].completed = true;
          setTaskCount((task) => task - 1);
          break;
        }
      }
    }

    renderItems();
  };

  const changeTheme = () => {
    if (counter === 1) {
      setTheme((x) => (x = darkTheme));
      setCounter(0);
    } else {
      setTheme((x) => (x = lightTheme));
      setCounter(1);
    }

    renderItems();
  };

  const removeTask = (key) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].key === key) {
        if (!list[i].completed) {
          setTaskCount((task) => task - 1);
        }
        list.splice(i, 1);
        break;
      }
    }

    renderItems();
  };

  const clearComp = () => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].completed) {
        list.splice(i, 1);
        return clearComp();
      }
    }

    renderItems();
  };

  const renderItems = () => {
    setItems(list.map((x) => todoDiff(x)));
  };

  const renderActiveItems = () => {
    setItems(list.filter((x) => x.completed === false).map((x) => todoDiff(x)));
  };

  const renderCompItems = () => {
    setItems(list.filter((x) => x.completed === true).map((x) => todoDiff(x)));
  };

  const todoDiff = (todo) => {
    if (todo.completed) {
      return (
        <li key={todo.key}>
          <div
            className="p-[1rem] sm:w-[40rem] flex flex-row gap-[1rem]"
            style={theme[2]}
          >
            <div
              className="flex flex-row gap-[1rem] basis-1/2 cursor-pointer"
              onClick={() => completeTask(todo.key)}
            >
              {/* <div
                style={{
                  background: "url(" + check + ")",
                }}
              /> */}

              <input type="checkbox" checked className="cursor-pointer" />
              <s>
                <p className="text-slate-500 text-[1.2rem]">{todo.task}</p>
              </s>
            </div>
            <div className="flex flex-row basis-1/2 justify-end">
              <img
                src={cross}
                alt="delete"
                className="cursor-pointer"
                onClick={() => removeTask(todo.key)}
              />
            </div>
          </div>
          <hr />
        </li>
      );
    } else {
      return (
        <li key={todo.key}>
          <div
            className="p-[1rem] sm:w-[40rem] flex flex-row gap-[1rem]"
            style={theme[2]}
          >
            <div
              className="flex flex-row gap-[1rem] basis-1/2 cursor-pointer"
              onClick={() => completeTask(todo.key)}
            >
              {/* <div
                style={{
                  background: "url(" + check + ")",
                }}
              /> */}

              <input type="checkbox" className="cursor-pointer" />
              <p className="text-[1.2rem]">{todo.task}</p>
            </div>
            <div className="flex flex-row basis-1/2 justify-end">
              <img
                src={cross}
                alt="delete"
                className="cursor-pointer"
                onClick={() => removeTask(todo.key)}
              />
            </div>
          </div>
          <hr />
        </li>
      );
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
                className="h-[3rem] w-[3rem] float-right cursor-pointer bg-no-repeat"
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
            <div
              className="flex flex-row sm:w-[40rem] p-[1rem] rounded-bl-lg rounded-br-lg"
              style={theme[2]}
            >
              <div className="flex basis-1/3">
                <p className="text-neutral-500">{taskCount} items left</p>
              </div>

              <div className="flex flex-row justify-between basis-1/3">
                <p
                  className="cursor-pointer hover:text-sky-400 text-neutral-500"
                  onClick={() => renderItems()}
                >
                  All
                </p>
                <p
                  className="cursor-pointer hover:text-sky-400 text-neutral-500"
                  onClick={() => renderActiveItems()}
                >
                  Active
                </p>
                <p
                  className="cursor-pointer hover:text-sky-400 text-neutral-500"
                  onClick={() => renderCompItems()}
                >
                  Completed
                </p>
              </div>

              <div className="flex basis-1/3 justify-end">
                <p
                  className="cursor-pointer hover:text-sky-400 text-neutral-500"
                  onClick={() => clearComp()}
                >
                  Clear Completed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
