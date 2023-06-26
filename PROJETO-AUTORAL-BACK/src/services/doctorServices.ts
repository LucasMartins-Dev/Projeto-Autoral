import bcrypt from "bcrypt";
import doctorRepositories from "../repositories/doctorRepositories.js";
import { v4 as uuidV4 } from "uuid";
import {duplicatedEmailError,invalidCredentialsError} from "../errors/index.js";

interface UserInput {
  name: string;
  email: string;
  password: string;
  specialty: string;
}

interface SignInInput {
  email: string;
  password: string;
}

async function create({ name, email, password, specialty}: UserInput) {
  const { rowCount } = await doctorRepositories.findByEmail(email);
  if (rowCount) throw duplicatedEmailError(email).message;

  const hashPassword = await bcrypt.hash(password, 10);
  await doctorRepositories.create({ name, email, password: hashPassword, specialty});
}

async function signin({ email, password }: SignInInput) {
  const {
    rowCount,
    rows: [user],
  } = await doctorRepositories.findByEmail(email);
  if (!rowCount) throw invalidCredentialsError().message;

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw invalidCredentialsError().message;

  const token = uuidV4();
  await doctorRepositories.createSession({ token, userId: user.id });

  return token;
}

export default {
  create,
  signin,
};