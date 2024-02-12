import { tUser } from "src/types/user";
import {
  getUser,
  getUsers,
  removeUser,
  updateUser,
  addUser,
} from "../models/user.model";

export function httpGetUsers() {
  return getUsers();
}

export function httpGetUser(userId: string) {
  return getUser(userId);
}

export function httpPostUser(newUser: tUser) {
  return addUser(newUser);
}

export function httpPutUser(newUser: tUser) {
  return updateUser(newUser);
}

export function httpDeleteUser(userId: string) {
  return removeUser(userId);
}
