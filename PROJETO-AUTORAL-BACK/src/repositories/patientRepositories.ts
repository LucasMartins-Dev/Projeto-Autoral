async function create({ name, dateBirth, phoneNumber }:any) {
    await connectionDb.query(
      `
          INSERT INTO doctors (name, dateBirth, phoneNumber)
          VALUES ($1, $2, $3)
      `,
      [name, dateBirth, phoneNumber]
    );
  }

export default {
    create,
   
  };