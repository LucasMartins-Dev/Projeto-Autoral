import connectionDb from "../config/database.js";

async function findByEmail(email:any) {
  return await connectionDb.query(
    `    
    SELECT * FROM doctors WHERE email=$1
  `,
    [email]
  );
}

async function create({ name, email, password ,specialty,city }:any) {
  await connectionDb.query(
    `
        INSERT INTO doctors (name, email, password ,specialty,city)
        VALUES ($1, $2, $3, $4, $5)
    `,
    [name, email, password,specialty,city]
  );
}

async function createSession({ token, userId }:any) {
    const doctorSessions = await connectionDb.query(
        `SELECT * FROM sessions WHERE "docId" = $1`
        , 
        [userId]
        );
        if (doctorSessions.rowCount !== 0){
          await connectionDb.query(
            `
                UPDATE sessions SET token = $1 WHERE 
                "docId" = $2   
            `,
            [token, userId]
          );
        }else{
          await connectionDb.query(
            `
                INSERT INTO sessions (token, "docId")
                VALUES ($1, $2)
            `,
            [token, userId]
          );
        }
}

async function findSessionByToken(token:any) {
  return await connectionDb.query(
    `
        SELECT * FROM sessions WHERE token = $1
    `,
    [token]
  );
}

async function findById(id:any) {
  return await connectionDb.query(
    `    
    SELECT * FROM doctors WHERE id=$1
  `,
    [id]
  );
}

export default {
  findByEmail,
  create,
  createSession,
  findById,
  findSessionByToken,
};