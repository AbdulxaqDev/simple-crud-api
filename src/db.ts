import { tUser } from "./types/user";

const db: tUser[] = [
  {
    id: "1",
    username: "brendan",
    age: 17,
    hobbies: ["golang", "haskel"],
  },
  {
    id: "2",
    username: "sasha",
    age: 25,
    hobbies: ["nodejs", "rust"],
  },
  {
    id: "3",
    username: "john",
    age: 45,
    hobbies: ["js", "Electronjs"],
  },
];

export default db;
