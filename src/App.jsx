import { useState, useEffect } from "react";
import cross from "./images/icon-cross.svg";
import check from "./images/icon-check.svg";
import sunButton from "./images/icon-sun.svg";
import moonButton from "./images/icon-moon.svg";
import lightBg from "./images/bg-desktop-light.jpg";
import darkBg from "./images/bg-desktop-dark.jpg";
import "./App.css";

function App() {
  const lightTheme = {
    mainBg: {
      backgroundColor: "#fafafa",
      backgroundImage: "url(" + lightBg + ")",
    },

    taskBg: {
      backgroundColor: "#fafafa",
    },

    taskText: {
      color: "#000000",
    },
  };

  const darkTheme = {
    mainBg: {
      backgroundColor: "#181824",
      backgroundImage: "url(" + darkBg + ")",
    },

    taskBg: {
      backgroundColor: "#25273c",
    },

    taskText: {
      color: "#bfc1d8",
    },
  };

  const [input, setInput] = useState("");
  const [items, setItems] = useState();
  const [list, setList] = useState([]);
  const [theme, setTheme] = useState(lightTheme);
  const [themeButton, setThemeButt] = useState(moonButton);
  const [themeFlag, setTheFlag] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const [listType, setLType] = useState(0);
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
      renderItems(listType);
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

    renderItems(listType);
  };

  const changeTheme = () => {
    if (themeFlag) {
      setTheme(lightTheme);
      setTheFlag(false);
      setThemeButt(moonButton);
    } else {
      setTheme(darkTheme);
      setTheFlag(true);
      setThemeButt(sunButton);
    }

    renderItems(listType);
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

    renderItems(listType);
  };

  const clearComp = () => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].completed) {
        list.splice(i, 1);
        return clearComp();
      }
    }

    renderItems(listType);
  };

  const renderItems = (style) => {
    if (style !== listType) {
      setLType((x) => (x = style));
    }

    switch (style) {
      case 0:
        setItems(list.map((x) => todoDiff(x)));
        break;
      case 1:
        setItems(
          list.filter((x) => x.completed === false).map((x) => todoDiff(x))
        );
        break;
      case 2:
        setItems(
          list.filter((x) => x.completed === true).map((x) => todoDiff(x))
        );
        break;
      default:
        renderItems(style);
        break;
    }
  };

  useEffect(() => {
    renderItems(listType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  // const renderItems = () => {
  //   setItems(list.map((x) => todoDiff(x)));
  //   setLType((x) => (x = 0));
  // };

  // const renderActiveItems = () => {
  //   setItems(list.filter((x) => x.completed === false).map((x) => todoDiff(x)));
  //   setLType((x) => (x = 1));
  // };

  // const renderCompItems = () => {
  //   setItems(list.filter((x) => x.completed === true).map((x) => todoDiff(x)));
  // };

  const todoDiff = (todo) => {
    if (todo.completed) {
      return (
        <li key={todo.key}>
          <div
            className="p-[1rem] sm:w-[40rem] flex flex-row gap-[1rem]"
            style={theme.taskBg}
          >
            <div
              className="flex flex-row gap-[1rem] basis-4/5 cursor-pointer"
              onClick={() => completeTask(todo.key)}
            >
              <div className="flex items-center">
                <div>
                  <div className="h-[1.5rem] w-[1.5rem] rounded-full border-2 border-gray-500 bg-gradient-to-br from-[#57ddff] to-[#c058f3]" />
                  <img
                    src={check}
                    alt=""
                    className="absolute -translate-y-[16px] translate-x-[7px]"
                  />
                </div>
              </div>
              <s>
                <p className="text-slate-500 text-[1.2rem] break-all">
                  {todo.task}
                </p>
              </s>
            </div>
            <div className="flex flex-row basis-1/5 justify-end items-center">
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
            style={theme.taskBg}
          >
            <div
              className="flex flex-row gap-[1rem] basis-4/5 cursor-pointer"
              onClick={() => completeTask(todo.key)}
            >
              <div className="flex items-center">
                <div className="h-[1.5rem] min-w-[1.5rem] rounded-full border-2 border-gray-500" />
              </div>
              <p className="text-[1.2rem] break-all" style={theme.taskText}>
                {todo.task}
              </p>
            </div>
            <div className="flex flex-row basis-1/5 justify-end items-center">
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
      <div
        className="bg-no-repeat bg-[20rem] sm:bg-contain w-screen h-screen flex flex-col items-center"
        style={theme.mainBg}
      >
        <div className="w-[90%] sm:w-[40rem] flex flex-col justify-content-center">
          <div className="flex flex-row mb-[2rem] mt-[6rem]">
            <div className="basis-1/2 text-left text-[2rem] sm:text-[3rem] text-white">
              <h1>T O D O</h1>
            </div>
            <div className="basis-1/2 mt-[1rem]">
              <img
                src={themeButton}
                alt="theme"
                onClick={() => changeTheme()}
                className="float-right h-[2rem] sm:h-[3rem] cursor-pointer"
              />
            </div>
          </div>
          <div>
            <form onSubmit={(e) => addTask(e)}>
              <input
                className="w-full p-[1rem] mb-[2rem]"
                style={theme.taskBg}
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
              style={theme.taskBg}
            >
              <div className="flex basis-1/3">
                <p className="text-neutral-500 text-[0.5rem] sm:text-[1rem]">
                  {taskCount} items left
                </p>
              </div>

              <div className="flex flex-row justify-between basis-1/3">
                <p
                  className="cursor-pointer text-[0.5rem] sm:text-[1rem] hover:text-sky-400 text-neutral-500"
                  onClick={() => renderItems(0)}
                >
                  All
                </p>
                <p
                  className="cursor-pointer text-[0.5rem] sm:text-[1rem] hover:text-sky-400 text-neutral-500"
                  onClick={() => renderItems(1)}
                >
                  Active
                </p>
                <p
                  className="cursor-pointer text-[0.5rem] sm:text-[1rem] hover:text-sky-400 text-neutral-500"
                  onClick={() => renderItems(2)}
                >
                  Completed
                </p>
              </div>

              <div className="flex basis-1/3 justify-end">
                <p
                  className="cursor-pointer text-[0.5rem] sm:text-[1rem] hover:text-sky-400 text-neutral-500"
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
