import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//get all users
export const userLogin = async (body) => {
  const data = await User.findOne({email: body.email});
  console.log(data);
  // return data;
  if(data == null){
    throw new Error("User dosen't exist");
  }else{
    const result = await bcrypt.compare(body.password, data.password);
    if(result){
      const token = jwt.sign({ "Id": data._id, "firstName": data.firstName, "email": data.email }, process.env.SECRET_KEY);
      return token;
    }else{
      throw new Error("Invalid Passowrd");
    }
  }
};

//create new user
export const UserRegistration = async (body) => {
  console.log("Before hassing body:",body);
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(body.password, saltRounds);
  body.password = hashPassword;
  console.log("After hassing body:",body);
  const data = await User.create(body);
  return data;
};

// //update single user
// export const updateUser = async (_id, body) => {
//   const data = await User.findByIdAndUpdate(
//     {
//       _id
//     },
//     body,
//     {
//       new: true
//     }
//   );
//   return data;
// };

// //delete single user
// export const deleteUser = async (id) => {
//   await User.findByIdAndDelete(id);
//   return '';
// };

// //get single user
// export const getUser = async (id) => {
//   const data = await User.findById(id);
//   return data;
// };
