import { app } from "./app.js";
import { connectDB } from "./data/dbconnect.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server working on port : ${process.env.PORT}`);
});
