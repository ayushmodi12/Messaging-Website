const notFound = (req, res, next) => {
  const error = new Error(`Did Not Find URL: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode === 200 ? 5000 : res.statusCode);
  res.json({
    message: err.message,
  });
};

module.exports = { notFound, errorHandler };
