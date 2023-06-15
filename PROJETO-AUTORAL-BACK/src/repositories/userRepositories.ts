import connectionDb from "../config/database.js";

async function findByEmail(email:any) {
  return await connectionDb.query(
    `    
    SELECT * FROM users WHERE email=$1
  `,
    [email]
  );
}

async function create({ name, email, password }:any) {
  await connectionDb.query(
    `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
    `,
    [name, email, password]
  );
}

async function createSession({ token, userId }:any) {
  const userSessions = await connectionDb.query(
    `SELECT * FROM sessions WHERE "userId" = $1`
    , 
    [userId]
    );
    if (userSessions.rowCount !== 0){
      await connectionDb.query(
        `
            UPDATE sessions SET token = $1 WHERE 
            "userId" = $2   
        `,
        [token, userId]
      );
    }else{
      await connectionDb.query(
        `
            INSERT INTO sessions (token, "userId")
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
    SELECT * FROM users WHERE id=$1
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