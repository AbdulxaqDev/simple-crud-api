import { tUser } from "src/types/user";
import db from "src/db";

export function isUserExist(userId: string): tUser | false {
  const exist = db.find((db_user) => db_user.id === userId);

  return !!exist ? exist : !!exist;
}
