const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;
const { createLogger, format, transports } = require("winston");
 
const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};
 
const logger = createLogger({
  levels: logLevels,
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
});


app.use(bodyParser.json());

app.get('/api/:name', function (req, res) {
    let data = { queryParams: req.params, pathParams: req.path }
    logger.info('Successfully fetched.')
    res.status(200).json(data);
});

app.post('/api/data', function (req, res) {
    let arrayData = [];
    arrayData.push(req.body);
    res.status(200).json(arrayData);
});

app.listen(port, function () {
    logger.info(`Server is running on port: ${port}`)
    // console.log("Server is running on port:", port);
});
