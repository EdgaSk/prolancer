const { logEvents } = require("./logEvents");

const errorHandle = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, "error.log");
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = { errorHandle };
