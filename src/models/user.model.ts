import db from "../db";
import { isUserExist } from "../utils/user.util";

import { tUser } from "src/types/user";

// POST user
export function addUser(newUser: tUser): tUser | false {
  const user = isUserExist(newUser.id);
  if (user) return false;

  db.push(newUser);
  return newUser;
}

// DELETE user
export function removeUser(userId: string): boolean {
  const user = isUserExist(userId);
  if (!user) return false;

  const index = db.indexOf(user);
  db.splice(index, 1);
  return true;
}

// PUT (update) user
export function updateUser(updatedUser: tUser): tUser | false {
  const user = isUserExist(updatedUser.id);
  if (!user) return false;

  const index = db.indexOf(user);
  db[index] = updatedUser;
  return db[index];
}

// GET user
export function getUser(userId: string): tUser | false {
  const user = isUserExist(userId);
  if (!user) return false;

  return user;
}

// GET users
export function getUsers(): tUser[] {
  return db;
}
