const success = (
  res,
  status,
  message,
  data = null
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

const error = (
  res,
  status,
  message
) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

module.exports = {
  success,
  error,
};