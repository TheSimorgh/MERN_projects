const globalErrHandler = (err, req, res, next) => {
  const status = err?.status ? err?.status : "Failed";
  const message = err?.message;
  const stack = err?.stack;
  res.status(500).json({
    status,
    message,
    stack,
  });
};

const notFound = (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUr1} on the server`);
  next(err);
};
module.exports = { notFound, globalErrHandler };