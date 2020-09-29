const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = 5000;

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `http://localhost:8000`)
  res.header(`Access-Control-Allow-Credentials`, true)
  res.header(
    `Access-Control-Allow-Headers`,
    `Origin, X-Requested-With, Content-Type, Accept`
  )
  next();
});

app.post('/', (req, res, next) => {
  console.log(req.body)
  res.sendStatus(200).send(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})