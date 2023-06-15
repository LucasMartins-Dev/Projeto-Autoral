import userServices from "../services/userServices.js";

async function create(req: any, res: any, next: any): Promise<void> {
  const { name, email, password } = req.body;
  try {
    await userServices.create({ name, email, password });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signin(req: any, res: any, next: any): Promise<void> {
  const { email, password } = req.body;
  try {
    const token = await userServices.signin({ email, password });
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  signin,
};
