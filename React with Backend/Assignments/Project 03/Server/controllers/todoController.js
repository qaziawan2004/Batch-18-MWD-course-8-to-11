import Todo from "../models/Todo.js";


// ==========================================
// GET ALL TODOS
// ==========================================

export const getTodos = async (
  req,
  res,
  next
) => {

  try {

    const todos =
      await Todo.find({
        user: req.user.id
      }).sort({
        createdAt: -1
      });


    res.status(200).json(
      todos
    );

  } catch (error) {

    next(error);

  }
};


// ==========================================
// GET SINGLE TODO
// ==========================================

export const getTodo = async (
  req,
  res,
  next
) => {

  try {

    const todo =
      await Todo.findOne({
        _id: req.params.id,
        user: req.user.id
      });


    if (!todo) {
      return res.status(404).json({
        message:
          "Todo not found"
      });
    }


    res.status(200).json(
      todo
    );

  } catch (error) {

    next(error);

  }
};


// ==========================================
// CREATE TODO
// ==========================================

export const createTodo = async (
  req,
  res,
  next
) => {

  try {

    const {
      title,
      description,
      priority
    } = req.body;


    if (
      !title ||
      title.trim() === ""
    ) {
      return res.status(400).json({
        message:
          "Todo title is required"
      });
    }


    const validPriorities = [
      "low",
      "medium",
      "high"
    ];


    if (
      priority &&
      !validPriorities.includes(
        priority
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid priority"
      });
    }


    const todo =
      await Todo.create({

        title:
          title.trim(),

        description:
          description
            ? description.trim()
            : "",

        priority:
          priority || "medium",

        user:
          req.user.id

      });


    res.status(201).json(
      todo
    );

  } catch (error) {

    next(error);

  }
};


// ==========================================
// UPDATE TODO
// ==========================================

export const updateTodo = async (
  req,
  res,
  next
) => {

  try {

    const {
      title,
      description,
      priority,
      completed
    } = req.body;


    const todo =
      await Todo.findOne({
        _id: req.params.id,
        user: req.user.id
      });


    if (!todo) {
      return res.status(404).json({
        message:
          "Todo not found"
      });
    }


    if (
      title !== undefined
    ) {

      if (
        title.trim() === ""
      ) {
        return res.status(400).json({
          message:
            "Todo title cannot be empty"
        });
      }


      todo.title =
        title.trim();
    }


    if (
      description !== undefined
    ) {
      todo.description =
        description.trim();
    }


    if (
      priority !== undefined
    ) {

      const validPriorities = [
        "low",
        "medium",
        "high"
      ];


      if (
        !validPriorities.includes(
          priority
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid priority"
        });
      }


      todo.priority =
        priority;
    }


    if (
      completed !== undefined
    ) {
      todo.completed =
        completed;
    }


    const updatedTodo =
      await todo.save();


    res.status(200).json(
      updatedTodo
    );

  } catch (error) {

    next(error);

  }
};


// ==========================================
// DELETE TODO
// ==========================================

export const deleteTodo = async (
  req,
  res,
  next
) => {

  try {

    const todo =
      await Todo.findOne({
        _id: req.params.id,
        user: req.user.id
      });


    if (!todo) {
      return res.status(404).json({
        message:
          "Todo not found"
      });
    }


    await Todo.findByIdAndDelete(
      req.params.id
    );


    res.status(200).json({
      message:
        "Todo deleted successfully"
    });

  } catch (error) {

    next(error);

  }
};
