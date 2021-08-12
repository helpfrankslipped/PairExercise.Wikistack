const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const { db } = require("./models");
const userRouter = require('./routes/users');
const wikiRouter = require('./routes/wiki');


db.authenticate().then(() => {
  console.log("connected to the database");
});

const PORT = 3000;

const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.static(__dirname + "/public"));

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get("/", (req, res) => {
  res.redirect('/wiki');
});

app.listen(PORT, async () => {
  try {
    console.log(`listening on port ${PORT}`);
    await db.sync({force: true});
  } catch (error) {
    console.log(error, "error");
  }
});
