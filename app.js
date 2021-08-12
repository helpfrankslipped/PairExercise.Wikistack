const express = require('express');
const morgan = require('morgan');

const PORT = 3000

const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded())
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.send("Hello World")
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
