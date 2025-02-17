if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;
const router = require("./routers/index");

app.disable("x-powered-by");
app.disable("Server");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`this app run at port ${port}`);
});
