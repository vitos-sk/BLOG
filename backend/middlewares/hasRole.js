module.exports = (roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).send({ error: "Access denied" });
      return;
    }
    next();
  };
};
