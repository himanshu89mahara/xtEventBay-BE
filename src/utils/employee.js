import axios from "axios";
import { generate } from "./keyCode";

export const findEmployee = async (email) => {
  const response = await axios.get(
    `${process.env.EMPLOYEE_API_ENDPOINT}?email=${email}`
  );
  const record = response.data.length > 0?response.data[0]:response.data;
 // const data = Object.keys(record).length > 0?record:null;
  if(Object.keys(record).length){
    return record;
  }
  if(process.env.NODE_ENV!=='production'){
      const employee = {
        id:Math.random(),
        name:"Mock User",
        email,
        oracleId:generate(),
        careerStage:"Senior Associate",
        primaryCapability:"XT-Core"
      }

      const user = await AddEmployee(employee);
      return user;
    }else{
      throw new Error("Email is not exists");
    }
  
};

export const AddEmployee = async(employee) =>{
  try{
    const response = await axios.post(`${process.env.EMPLOYEE_API_ENDPOINT}`,employee);
    return response.data;
  }catch(err){
    throw new Error(err.message);
  }
  
}


