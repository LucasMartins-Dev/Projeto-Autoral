import doctorServices from "../services/doctorServices.js";

async function create(req: any, res: any, next: any): Promise<void> {
  const { name, email, password, specialty, city } = req.body;
  try {
    await doctorServices.create({ name, email, password, specialty, city });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signin(req: any, res: any, next: any): Promise<void> {
  const { email, password } = req.body;
  try {
    const token = await doctorServices.signin({ email, password });
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  signin,
};
