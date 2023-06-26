import connectionDb from "../config/database.js";


async function create( doctorId: number, userId:number, date:string, time:number ){
  await connectionDb.query(
    `
        INSERT INTO appointments ("doctorId", "userId", date, time)
        VALUES ($1, $2, $3, $4)
    `,
    [doctorId, userId, date, time]
  );
}

async function compare( doctorId: number, date:string, time:number ){
  const comparate = await connectionDb.query(
    `
    SELECT * FROM appointments WHERE "doctorId" = $1 AND date = $2 AND time = $3
    `,
    [doctorId, date, time]
  );
  return comparate;
}

async function searchDoctorName( doctorname : any) {
  const comparate = await connectionDb.query(`
    SELECT * FROM doctors WHERE name like '%${doctorname}%' 
    `);
  return comparate.rows;
}

async function searchSpecialty( specialty : any){
  const comparate = await connectionDb.query(`
    SELECT * FROM doctors WHERE specialty like '%${specialty}%' 
    `);
  return comparate.rows;
}


export default {
  create,
  compare,
  searchDoctorName,
  searchSpecialty,
};