import {
  useEffect,
  useState
} from "react";

import Navbar from "../components/Navbar.jsx";

import TodoForm from "../components/TodoForm.jsx";

import TodoItem from "../components/TodoItem.jsx";

import api from "../services/api.js";


const Todos = () => {

  const [todos, setTodos] =
    useState([]);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");


  // ==========================
  // GET TODOS
  // ==========================

  const fetchTodos = async () => {

    try {

      setLoading(true);

      const response =
        await api.get("/todos");

      setTodos(
        response.data
      );

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to load todos"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchTodos();

  }, []);


  // ==========================
  // CREATE TODO
  // ==========================

  const addTodo = async (
    title
  ) => {

    try {

      const response =
        await api.post(
          "/todos",
          {
            title
          }
        );


      setTodos(
        (previousTodos) => [
          response.data,
          ...previousTodos
        ]
      );


      setError("");

      return true;

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to create todo"
      );

      return false;
    }
  };


  // ==========================
  // TOGGLE TODO
  // ==========================

  const toggleTodo = async (
    todo
  ) => {

    try {

      const response =
        await api.put(
          `/todos/${todo._id}`,
          {
            completed:
              !todo.completed
          }
        );


      setTodos(
        (previousTodos) =>
          previousTodos.map(
            (item) =>
              item._id === todo._id
                ? response.data
                : item
          )
      );


      setError("");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to update todo"
      );
    }
  };


  // ==========================
  // DELETE TODO
  // ==========================

  const deleteTodo = async (
    id
  ) => {

    try {

      await api.delete(
        `/todos/${id}`
      );


      setTodos(
        (previousTodos) =>
          previousTodos.filter(
            (todo) =>
              todo._id !== id
          )
      );


      setError("");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to delete todo"
      );
    }
  };


  return (

    <>

      <Navbar />


      <main className="todo-container">

        <h1>
          My Todos
        </h1>


        {error && (
          <div className="error">
            {error}
          </div>
        )}


        <TodoForm
          onAdd={addTodo}
        />


        {loading ? (

          <p className="loading">
            Loading todos...
          </p>

        ) : todos.length === 0 ? (

          <p className="empty">
            No todos yet. Add your first todo!
          </p>

        ) : (

          <div className="todo-list">

            {todos.map((todo) => (

              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />

            ))}

          </div>

        )}

      </main>

    </>
  );
};


export default Todos;
