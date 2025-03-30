import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello World!');
})


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
