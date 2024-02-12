import { validate, v4 as uuidv4 } from "uuid";
import { tUser } from "../types/user";
import db from "../db";

export function isUserExist(userId: string): tUser | false {
  const exist = db.find((db_user) => db_user.id === userId);

  return !!exist ? exist : !!exist;
}

export function isValidUUID(uuid: string): boolean {
  if (uuid.length !== 36) {
    return false;
  }
  return validate(uuid);
}

export function getNewUUID(): string {
  return uuidv4();
}
