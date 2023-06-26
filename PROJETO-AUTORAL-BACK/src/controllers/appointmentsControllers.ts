import appointmentServices from "../services/appointmentServices";
import {Request,Response,NextFunction} from "express"


async function newAppointment(req: Request, res: Response, next: NextFunction) {
  const { doctorId, userId, date, time } = req.body;
  try {
    await appointmentServices.duplicateAppointment({ doctorId,userId, date, time });
    await appointmentServices.createAppointment({ doctorId, userId, date, time });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function searchAppointmentbyDoctorName(req: Request, res: Response, next: NextFunction) {
  const { name } = req.params;
  try {
    await appointmentServices.searchDoctorName({ name });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function searchAppointmentbySpecialty(req: Request, res: Response, next: NextFunction) {
  const { specialty } = req.params;
  try {
    await appointmentServices.searchSpecialty({ specialty });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

export default {
  searchAppointmentbyDoctorName,
  searchAppointmentbySpecialty,
  newAppointment,
};
