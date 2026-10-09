import {
  useEffect,
  useState
} from "react";

import Navbar from "../components/Navbar.jsx";

import TodoForm from "../components/TodoForm.jsx";

import TodoItem from "../components/TodoItem.jsx";

import api from "../services/api.js";


const Dashboard = () => {

  const [todos, setTodos] =
    useState([]);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");


  const [editingTodo, setEditingTodo] =
    useState(null);


  // ==========================================
  // GET TODOS
  // ==========================================

  const fetchTodos =
    async () => {

      try {

        setLoading(true);

        const response =
          await api.get(
            "/todos"
          );


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


  // ==========================================
  // CREATE TODO
  // ==========================================

  const addTodo =
    async (todoData) => {

      try {

        const response =
          await api.post(
            "/todos",
            todoData
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


  // ==========================================
  // TOGGLE TODO
  // ==========================================

  const toggleTodo =
    async (todo) => {

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


  // ==========================================
  // DELETE TODO
  // ==========================================

  const deleteTodo =
    async (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this todo?"
        );


      if (!confirmed) {
        return;
      }


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


  // ==========================================
  // START EDITING
  // ==========================================

  const handleEdit =
    (todo) => {

      setEditingTodo({
        ...todo
      });

    };


  // ==========================================
  // SAVE EDIT
  // ==========================================

  const saveEdit =
    async () => {

      try {

        const response =
          await api.put(
            `/todos/${editingTodo._id}`,
            {
              title:
                editingTodo.title,

              description:
                editingTodo.description,

              priority:
                editingTodo.priority,

              completed:
                editingTodo.completed
            }
          );


        setTodos(
          (previousTodos) =>
            previousTodos.map(
              (todo) =>
                todo._id ===
                editingTodo._id
                  ? response.data
                  : todo
            )
        );


        setEditingTodo(null);

        setError("");

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Failed to update todo"
        );

      }

    };


  // ==========================================
  // EDIT SCREEN
  // ==========================================

  if (editingTodo) {

    return (

      <>

        <Navbar />


        <main className="todo-container">

          <h1>
            Edit Todo
          </h1>


          {error && (

            <div className="error">
              {error}
            </div>

          )}


          <div className="edit-form">

            <input
              type="text"
              value={
                editingTodo.title
              }
              onChange={(e) =>
                setEditingTodo({
                  ...editingTodo,

                  title:
                    e.target.value
                })
              }
            />


            <textarea
              rows="5"
              value={
                editingTodo.description
              }
              onChange={(e) =>
                setEditingTodo({
                  ...editingTodo,

                  description:
                    e.target.value
                })
              }
            />


            <select
              value={
                editingTodo.priority
              }
              onChange={(e) =>
                setEditingTodo({
                  ...editingTodo,

                  priority:
                    e.target.value
                })
              }
            >

              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>

            </select>


            <div className="edit-buttons">

              <button
                onClick={
                  saveEdit
                }
              >
                Save Changes
              </button>


              <button
                className="secondary-button"
                onClick={() =>
                  setEditingTodo(null)
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </main>

      </>

    );

  }


  // ==========================================
  // DASHBOARD
  // ==========================================

  return (

    <>

      <Navbar />


      <main className="todo-container">

        <h1>
          My Todo Dashboard
        </h1>


        {error && (

          <div className="error">
            {error}
          </div>

        )}


        <TodoForm
          onAdd={addTodo}
        />


        <h2 className="section-title">
          My Todos
        </h2>


        {loading ? (

          <p className="loading">
            Loading todos...
          </p>

        ) : todos.length === 0 ? (

          <p className="empty">
            You don't have any todos yet.
          </p>

        ) : (

          <div className="todo-list">

            {todos.map(
              (todo) => (

                <TodoItem
                  key={
                    todo._id
                  }

                  todo={todo}

                  onToggle={
                    toggleTodo
                  }

                  onDelete={
                    deleteTodo
                  }

                  onEdit={
                    handleEdit
                  }
                />

              )
            )}

          </div>

        )}

      </main>

    </>

  );
};


export default Dashboard;
