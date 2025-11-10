const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generate, verify } = require("../helpers/token");
const ROLES = require("../constants/role");

async function register(login, password) {
  if (!password) throw new Error("Password is required");
  const passwordHash = await bcrypt.hash(password, 10);

  const existingUser = await User.findOne({ login });
  if (existingUser) throw new Error("User already exists");

  const user = await User.create({
    login,
    password: passwordHash,
  });
  const token = generate({ id: user._id });

  return { user, token };
}

async function login(login, password) {
  const user = await User.findOne({ login });
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  const token = generate({ id: user._id });
  return { user, token };
}

async function getUsers() {
  return await User.find();
}

function getRoles() {
  return [
    { id: ROLES.ADMIN, name: "Admin" },
    { id: ROLES.MODERATOR, name: "Moderator" },
    { id: ROLES.USER, name: "User" },
  ];
}

async function deleteUser(id) {
  await User.findByIdAndDelete({ _id: id });
}

async function updateUser(id, data) {
  return await User.findByIdAndUpdate(id, data, { returnDocument: "after" });
}

module.exports = {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  updateUser,
};
