const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onEdit
}) => {

  const formattedDate =
    new Date(
      todo.createdAt
    ).toLocaleString();


  return (

    <div
      className={
        `todo-item ${
          todo.completed
            ? "todo-completed"
            : ""
        }`
      }
    >

      <div className="todo-content">

        <div className="todo-title-row">

          <input
            type="checkbox"
            checked={
              todo.completed
            }
            onChange={() =>
              onToggle(todo)
            }
          />


          <h3>
            {todo.title}
          </h3>

        </div>


        {todo.description && (

          <p className="todo-description">
            {todo.description}
          </p>

        )}


        <div className="todo-meta">

          <span
            className={
              `priority priority-${todo.priority}`
            }
          >
            {todo.priority}
          </span>


          <span>
            Added: {formattedDate}
          </span>

        </div>

      </div>


      <div className="todo-actions">

        <button
          className="edit-button"
          onClick={() =>
            onEdit(todo)
          }
        >
          Edit
        </button>


        <button
          className="delete-button"
          onClick={() =>
            onDelete(todo._id)
          }
        >
          Delete
        </button>

      </div>

    </div>

  );
};


export default TodoItem;
