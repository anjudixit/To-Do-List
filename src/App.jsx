import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showFinished, setShowFinished] = useState(false);
  const completedTasks = todos.filter((item) => item.isCompleted).length;
  const totalTasks = todos.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;


  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString) {
      let todo = JSON.parse(todoString);
      setTodos(todo);
    }
  }, []);

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    if (todos.length > 0) {
      saveToLocalStorage('todos', todos);
    }
  }, [todos]);

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), dueDate, todo, isCompleted: false }]);
    setTodo('');
    setDueDate('');
    saveToLocalStorage('todos', todos);
  }
  const handleChange = (e) => {
    setTodo(e.target.value);
  }
  const handleCheckbox = (e) => {
    console.log(e, e.target.checked);
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(index);
    let newTodos = todos;
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos([...newTodos]);
    console.log(newTodos);
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    setDueDate(t[0].dueDate);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos([...newTodos]);
    saveToLocalStorage('todos', todos);
  }
  const handleDelete = (e, id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      let newTodos = todos.filter(item => {
        return item.id !== id;
      });
      setTodos([...newTodos]);
      saveToLocalStorage('todos', todos);
    }
  }

  useEffect(() => {
    const showFinishedSetting = localStorage.getItem('showFinished');
    if (showFinishedSetting !== null) {
      setShowFinished(JSON.parse(showFinishedSetting));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('showFinished', JSON.stringify(showFinished));
  }, [showFinished]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <>
      <Navbar />
      <div className="flex justify-end">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 mt-3 mr-4 rounded-full shadow-lg transition-all transform hover:scale-105 ${darkMode
            ? 'bg-gray-800 text-white hover:bg-gray-700'
            : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:from-blue-600 hover:via-purple-600 hover:to-pink-600'
            }`}
        >
          {darkMode ? (
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined">light_mode</span>
              Light Mode
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined">dark_mode</span>
              Dark Mode
            </span>
          )}
        </button>
      </div>
      <div
        className={`container mx-auto p-6 my-6 rounded-xl shadow-lg min-h-[80vh] ${darkMode
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white'
          }`}
      >
        <div className="addTodo mb-6">
          <h2 className="font-bold text-3xl mb-6 text-center">To-Do List</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="border-2 border-purple-500 rounded-lg p-3 w-full md:w-2/3 text-black"
              placeholder="Enter a new task"
            />
            <input
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
              type="date"
              className="border-2 border-purple-500 rounded-lg p-3 w-full md:w-auto text-black"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 1 || !dueDate}
              className="bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800 transition-all shadow-md disabled:bg-purple-500 w-full md:w-auto"
            >
              Add Task
            </button>
          </div>
        </div>
        <div
          className="progress-container bg-gray-300 rounded-full h-2 mb-4 cursor-pointer"
          onClick={() => alert(`Progress: ${Math.round(progress)}%`)}
        >
          <p className="text-center mb-2">
            Progress: <span className="font-bold">{Math.round(progress)}%</span>
          </p>
          <div
            className="progress bg-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%`, transition:'width 0.3s ease-in-out' }}
          ></div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showFinished}
              onChange={() => setShowFinished(!showFinished)}
              className="w-5 h-5"
            />
            <span>Show Finished Tasks</span>
          </label>
          <div className="text-right">
            <p>
              Total: <span className="font-bold">{todos.length}</span>
            </p>
            <p>
              Completed:{" "}
              <span className="font-bold">
                {todos.filter((item) => item.isCompleted).length}
              </span>
            </p>
            <p>
              Remaining:{" "}
              <span className="font-bold">
                {todos.filter((item) => !item.isCompleted).length}
              </span>
            </p>
          </div>
        </div>
        <h2 className="font-bold text-2xl mb-4">Your Todos</h2>

        <div className="todos space-y-4">
          {todos.length === 0 && (
            <div className="text-center text-gray-200 italic">
              No todos added yet
            </div>
          )}
          <AnimatePresence>
            {todos
              .filter((item) => (showFinished ? true : !item.isCompleted))
              .map((item) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.1, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="todo flex flex-col md:flex-row justify-between items-center bg-white text-black p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                  key={item.id}
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      className="w-5 h-5"
                    />
                    <div
                      className={`text-lg ${item.isCompleted
                        ? "line-through text-gray-500"
                        : new Date(item.dueDate) < new Date()
                          ? "text-red-500"
                          : ""
                        }`}
                    >
                      {item.todo}{''}
                      <span className='text-sm text-gray-400'>
                        (Due: {item.dueDate})
                      </span>
                    </div>
                  </div>
                  <div className="buttons flex gap-2 mt-4 md:mt-0">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-all shadow-md flex items-center"
                    >
                      Edit
                      <span className="material-symbols-outlined ml-1">
                        edit
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all shadow-md flex items-center"
                    >
                      Delete
                      <span className="material-symbols-outlined ml-1">
                        delete
                      </span>
                    </button>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}


export default App
