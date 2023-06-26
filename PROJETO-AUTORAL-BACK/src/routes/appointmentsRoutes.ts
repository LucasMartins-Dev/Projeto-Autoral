import { Router } from "express";
import appointmentsControllers from "../controllers/appointmentsControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const appointmentRoutes = Router()

appointmentRoutes.post('/newappointment', authMiddleware.authValidation,appointmentsControllers.newAppointment)
appointmentRoutes.get('/searchByName/:doctorname',authMiddleware.authValidation,appointmentsControllers.searchAppointmentbyDoctorName)
appointmentRoutes.get('/searchByCity/:city',authMiddleware.authValidation,appointmentsControllers.searchAppointmentbyCity)
appointmentRoutes.get('/searchBySpecialty/:specialty',authMiddleware.authValidation,appointmentsControllers.searchAppointmentbySpecialty)


export default appointmentRoutes
