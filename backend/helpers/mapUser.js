module.exports = function mapUser(user) {
  return {
    id: user._id,
    login: user.login,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
