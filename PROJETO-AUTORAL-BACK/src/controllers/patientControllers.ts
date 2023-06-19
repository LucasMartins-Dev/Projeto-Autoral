import patientServices from "../services/patientServices";


async function create(req: any, res: any, next: any): Promise<void> {
    const { name, dateBirth, phoneNumber } = req.body;
    try {
      await patientServices.create({ name,dateBirth,phoneNumber});
      return res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
  