import prisma from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/bcryptUtils.js";
import jwt from "jsonwebtoken";

export async function createUser(name, email, password) {
  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Email already exists. Please a different email.");
    }
    throw new Error("Error creating user");
  }
}

export async function loginUserService(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "defaultSecretKey",
    { expiresIn: "1h" },
  );
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      currentStreak: user.currentStreak,
      previousStreak: user.previousStreak,
      dailyGoalHours: user.dailyGoalHours,
      dailyStudyMinutes: user.dailyStudyMinutes
    },
  };
}

// getting all users
export async function fetchAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

// fetch a user by a specific id
export async function fetchUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      currentStreak: true,
      previousStreak: true,
      dailyGoalHours: true,
      dailyStudyMinutes: true
    }
  });
  if (!user) {
    throw new Error("User not found!");
  }
  return user;
}

// update a user
export async function updatedUser(name, email, password, id) {
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!existingUser) {
    throw new Error("User not found!");
  }
  let hashedPassword = existingUser.password;
  if (password) {
    hashedPassword = await hashPassword(password);
  }
  const updated = await prisma.user.update({
    where: { id },
    data: { name, email, password: hashedPassword },
  });
  return {
    id: updated.id,
    name: updated.name,
    email: updated.email,
  };
}

// deleting an existing user
export async function deleteUser(id) {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!existingUser) {
    throw new Error("User not found")
  }
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return { message: "User deleted successfully"};
}
