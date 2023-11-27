import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//routes
import postRoutes from "./routes/post.js";

dotenv.config();

const app = express();

// parses json body with 30mb limit with complex data structure
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

//all routes going to posts will go through locahost:5000/posts not localhost/
//prefixed with /posts from the post routes
app.use("/posts", postRoutes);

//mongodb atlas for database
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

//mongoose connect
mongoose
  .connect(CONNECTION_URL, {
    // useNewUrlParser: true, //deprecated
    // useUnifiedTopology: true, //deprecated
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(error.message));

//tells Mongoose to use the MongoDB driver's findOneAndUpdate() function directly instead of findAndModify().
// as findAndModify() will be or has been deprecated
// mongoose.set("useFindAndModify", false); //deprecated
