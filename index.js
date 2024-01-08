import express from "express";
import Routes from "./routes/Routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import FileUpload from "express-fileupload";

const app = express();
const port = 5000;
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(Routes);

app.listen(port, () => {
  console.log(`server runing on port ${port}`);
});
