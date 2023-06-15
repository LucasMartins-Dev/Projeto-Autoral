import joi from "joi";

export const appointmentSchemma = joi.object({
    date:joi.required(),
    time:joi.required()
})