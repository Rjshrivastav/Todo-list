import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showfinished, setshowfinished] = useState('');

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveToLS()
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(item=>item.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    settodos(newTodos)
    saveToLS()
  };

  const handleDel = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLS()
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    saveToLS()
  };

  const toggleFinished = (e) => {
    setshowfinished(!showfinished)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="container bg-slate-200 p-10 min-h-screen w-2/4 m-auto mt-8 cursor-default">
        <div className="addTodo grid gap-4">
          <h1 className="text-lg font-bold text-center">Add a Todo</h1>
          <input
            onChange={handleChange}
            value={todo}
            className="border-black border-2 rounded-lg p-4 h-8 mr-4 w-full overflow-scroll"
            type="text"
            placeholder="write a todo..."
          />
          <button
            onClick={handleAdd}
            disabled={todo.length<3}
            className=" m-auto w-1/4 text-center h-8 bg-slate-400 rounded-lg hover:bg-blue-400"
          >
            Add
          </button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showfinished} id="" /> Show finished todos
        <h1 className="text-lg font-bold mt-5">Your Todo's</h1>
        <div className="todos">
          {todos.length === 0 && (
            <div className=" text-center opacity-60 m-2">No Todos to display</div>
          )}
          {todos.map((item) => {
            return ((showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between m-2">
                <div className="flex gap-5 items-center">
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={todo.isCompleted}
                    name={item.id}
                    id=""
                  />

                  <div className={item.isCompleted ? " line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="btn flex gap-5 items-center">
                  <button
                    onClick={(e) => {handleEdit(e, item.id)}}
                    className="w-20 h-8 bg-slate-400 rounded-lg hover:bg-blue-400"
                  >
                    edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDel(e, item.id);
                    }}
                    className="w-20 h-8 bg-slate-400 rounded-lg hover:bg-red-400"
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
