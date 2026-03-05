import {
  fetchAllUsers,
  createUser,
  fetchUserById,
  updatedUser,
  deleteUser,
  loginUserService
} from "../services/userServices.js";

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const { token, user} = await loginUserService(email, password);
    res.cookie("token-Cookie", token, { httpOnly: true, signed: true });
    return res.status(200).json({ message: 'Login successful', token, user});
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}
export async function getAllUsers(req, res) {
  try {
    const users = await fetchAllUsers();
    return res.status(200).json({ message: "Users fetched successfully", details: users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message});
  }
}

export async function fetchById(req, res) {
  try {
    const user = await fetchUserById( req.params.id );
    return res.status(200).json({
      message: "User fetched successfully",
      details: user
    })
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

export async function updatedUserById(req, res) {
  try {
    const { name, email, password} = req.body
    const user = await updatedUser(name, email, password, req.params.id)
    return res.status(200).json({ message: 'User updated successfully', details: user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function postUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const user = await createUser(name,email,password);
    res.status(201).json({message: "User registered successfully!", details: user});
  } catch (error) {
     return res
      .status(400)
      .json({ message: error.message });
  }
}
export async function deleteUserById(req, res) {
  try {
    const result = await deleteUser(req.params.id);
    return res.status(200).json({ result });
  } catch (error) {
    return res
      .status(404)
      .json({ message: error.message });
  }
}