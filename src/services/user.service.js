import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mailSender } from '../utils/mailSender';
import { sender } from '../utils/rabbitmq';

//create new user
export const UserRegistration = async (body) => {
  console.log("Before hassing body:", body);
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(body.password, saltRounds);
    body.password = hashPassword;
    console.log("After hassing body:", body);
    const data = await User.create(body);
    sender(data);
    return data;
};

//get all users
export const userLogin = async (body) => {
  const data = await User.findOne({ email: body.email });
  console.log(data);
  // return data;
  if (data == null) {
    throw new Error("User dosen't exist");
  } else {
    const result = await bcrypt.compare(body.password, data.password);
    if (result) {
      const token = jwt.sign({ "Id": data._id, "firstName": data.firstName, "email": data.email }, process.env.SECRET_KEY);
      return token;
    } else {
      throw new Error("Invalid Passowrd");
    }
  }
};

// forgot password
export const forgotPassword = async (body) => {
  const data = await User.findOne({ email: body.email })
  if (data != null) {
    const token = jwt.sign({ email: data.email, _id: data._id }, process.env.FORGOT_KEY)
    const result = await mailSender(data.email, token)
    return result;
  } else {
    throw new Error('User does not exist')
  }
}

// reset password
export const resetPassword = async (body) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(body.password, saltRounds);
  console.log("Inside Service", body.password);
  body.password = hash;
  const data = User.findOneAndUpdate({ email: body.email }, { password: body.password }, { new: true });
  return data;
};