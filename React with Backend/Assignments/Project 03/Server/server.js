import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";

import todoRoutes from "./routes/todoRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";


dotenv.config();


// Connect MongoDB

connectDB();


const app =
  express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin:
      "http://localhost:5173"
  })
);


app.use(
  express.json()
);


// ==========================================
// TEST ROUTE
// ==========================================

app.get(
  "/",
  (req, res) => {

    res.json({
      message:
        "Todo API is running"
    });

  }
);


// ==========================================
// AUTH ROUTES
// ==========================================

app.use(
  "/api/auth",
  authRoutes
);


// ==========================================
// TODO ROUTES
// ==========================================

app.use(
  "/api/todos",
  todoRoutes
);


// ==========================================
// 404
// ==========================================

app.use(
  (req, res) => {

    res.status(404).json({
      message:
        "Route not found"
    });

  }
);


// ==========================================
// ERROR HANDLER
// ==========================================

app.use(
  errorMiddleware
);


// ==========================================
// SERVER
// ==========================================

const PORT =
  process.env.PORT || 5000;


app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);
