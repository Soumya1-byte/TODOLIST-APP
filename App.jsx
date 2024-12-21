import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Navbar from './components/navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);

  const handleAdd = () => {
    if (todo.trim() !== "") { // Prevent empty todos from being added
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      settodo(""); // Clear input
    }
  };

  const handleDelete = (todoToDelete) => {
    settodos(todos.filter(item => item.todo !== todoToDelete));
  };

  const handleEdit = (todoToEdit) => {
    const newTodo = prompt("Edit your todo", todoToEdit);
    if (newTodo) {
      settodos(todos.map(item => 
        item.todo === todoToEdit ? { ...item, todo: newTodo } : item
      ));
    }
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id; // Corrected from item.id to items.id
    });
    let newTodos = [...todos]; 
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos); // Corrected from setTodos to settodos
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 rounded-xl p-5 mx-auto bg-violet-200 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>ADD A TODO</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className='w-80 border-gray-700'
          />
          <button
            onClick={handleAdd}
            className='bg-violet-400 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6 font-bold text-sm'
          >
            Add
          </button>
        </div>

        <h2 className='text-lg font-bold'>YOUR TODO'S</h2>
        <div className="todos">
          {todos.length ===0 && <div className='m-5'> No todo to display</div>}
          {todos.map(item => (
            <div key={item.id} className="todo flex w-1/2 justify-between">
              <div className='flex gap-4'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons">
                <button
                  onClick={() => handleEdit(item.todo)}
                  className='bg-violet-400 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 font-bold text-sm'
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(item.todo)}
                  className='bg-violet-400 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 font-bold text-sm'
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
