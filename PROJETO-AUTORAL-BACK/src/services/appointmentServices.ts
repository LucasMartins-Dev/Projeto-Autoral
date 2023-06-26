import appointmentsRepositories from "../repositories/appointmentsRepositories.js";
import {invalidDateError,invalidDayError,invalidHourError} from "../errors/index";

async function createAppointment({
  doctorId,
  userId,
  date,
  time,
}: {
  doctorId: number;
  userId: number;
  date: string;
  time: number;
}): Promise<void> {
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.getUTCDay();

  // Check if day of week is Monday-Friday (1-5)
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    if (time >= 8 && time <= 17) {
      await appointmentsRepositories.create(doctorId, userId, date, time );
    } else {
      throw invalidHourError().message;
    }
  } else {
    throw invalidDayError().message;
  }
}

async function duplicateAppointment({
  doctorId,
  userId,
  date,
  time,
}: {
  doctorId: number;
  userId: number;
  date: string;
  time: number;
}): Promise<void> {
  const duplicate = await appointmentsRepositories.compare(
    doctorId,
    date,
    time,
  );
  console.log(duplicate.rows[0]);
  if (duplicate.rows[0] !== undefined) {
    throw invalidDateError().message;
  }
}

async function searchDoctorName({
  name,
}: {
  name: string;
}): Promise<void> {
  const search = await appointmentsRepositories.searchDoctorName({ name });

  console.log(search);
}

async function searchSpecialty({
  specialty,
}: {
  specialty: string;
}): Promise<void> {
  const search = await appointmentsRepositories.searchSpecialty({ specialty });
  console.log(search);
}


export default {
  duplicateAppointment,
  createAppointment,
  searchDoctorName,
  searchSpecialty,
};