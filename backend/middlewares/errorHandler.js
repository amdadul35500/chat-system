const notFoundHandler = (req, res, next) => {
  res.status(404).send("Request url was not found!");
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next("There was a problem!");
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.send("There was an error!");
    }
  }
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
