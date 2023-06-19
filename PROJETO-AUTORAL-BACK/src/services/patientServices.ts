import patientRepositories from "../repositories/patientRepositories";

interface UserInput {
    name: string;
    dateBirth: string;
    phoneNumber: string;
    
  }

async function create({ name, dateBirth, phoneNumber }: UserInput) {
  
    
    await patientRepositories.create({ name, dateBirth, phoneNumber});
  }

export default {
    create,
  };