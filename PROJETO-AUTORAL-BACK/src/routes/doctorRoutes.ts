import { Router } from "express";
import doctorControllers from "../controllers/doctorControllers.js";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
import { doctorSchemma } from "../schemas/Doctor.js";

const doctorRoutes = Router()

doctorRoutes.post('/signup/doctor', validateSchema(doctorSchemma) , doctorControllers.create)
doctorRoutes.post('/signin/doctor',doctorControllers.signin)

export default doctorRoutes






