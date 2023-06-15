import bcrypt from "bcrypt";
import userRepositories from "../repositories/userRepositories.js";
import { v4 as uuidV4 } from "uuid";
import {invalidCredentialsError,duplicatedEmailError} from "../errors/index.js";


interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

interface IUserSignIn {
  email: string;
  password: string;
}

async function create({ name, email, password }: IUserCreate): Promise<void> {
  const { rowCount } = await userRepositories.findByEmail(email);
  if (rowCount) throw duplicatedEmailError(email).message;

  const hashPassword = await bcrypt.hash(password, 10);
  await userRepositories.create({ name, email, password: hashPassword });
}

async function signin({ email, password }: IUserSignIn): Promise<string> {
  const {
    rowCount,
    rows: [user],
  }: { rowCount: number; rows: User[] } = await userRepositories.findByEmail(email);
  if (!rowCount) throw invalidCredentialsError().message;

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw invalidCredentialsError().message;

  const token = uuidV4();
  await userRepositories.createSession({ token, userId: user.id });

  return token;
}

export default {
  create,
  signin,
};
