import {
  useState
} from "react";


const TodoForm = ({
  onAdd
}) => {

  const [title, setTitle] =
    useState("");


  const [description, setDescription] =
    useState("");


  const [priority, setPriority] =
    useState("medium");


  const [loading, setLoading] =
    useState(false);


  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();


    if (!title.trim()) {
      return;
    }


    setLoading(true);


    const success =
      await onAdd({
        title,
        description,
        priority
      });


    if (success) {

      setTitle("");

      setDescription("");

      setPriority("medium");

    }


    setLoading(false);

  };


  return (

    <form
      className="todo-form"
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        placeholder="Todo title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        required
      />


      <textarea
        placeholder="Todo description"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        rows="4"
      />


      <select
        value={priority}
        onChange={(e) =>
          setPriority(
            e.target.value
          )
        }
      >

        <option value="low">
          Low Priority
        </option>

        <option value="medium">
          Medium Priority
        </option>

        <option value="high">
          High Priority
        </option>

      </select>


      <button
        type="submit"
        disabled={loading}
      >

        {loading
          ? "Adding..."
          : "Add Todo"}

      </button>

    </form>

  );
};


export default TodoForm;
