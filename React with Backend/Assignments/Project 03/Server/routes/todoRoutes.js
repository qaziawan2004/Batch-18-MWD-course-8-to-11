import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} from "../controllers/todoController.js";


const router =
  express.Router();


// Everything below requires JWT

router.use(
  authMiddleware
);


router.get(
  "/",
  getTodos
);


router.get(
  "/:id",
  getTodo
);


router.post(
  "/",
  createTodo
);


router.put(
  "/:id",
  updateTodo
);


router.delete(
  "/:id",
  deleteTodo
);


export default router;
