const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// Middleware
app.use(express.json());


app.use(cors({
  origin: ["https://merntaskmanager.vercel.app"],
  credentials: true
}));

// MongoDB Connection
const mongoUrl = process.env.MONGODB_URL;
if (!mongoUrl) {
  console.error("❌ MONGODB_URL is not defined in the .env file");
  process.exit(1);
}

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected..."))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

// Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.resolve(__dirname, "../frontend/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
//   );
// }

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Backend is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("MERN Task Manager API is running 🚀");
});