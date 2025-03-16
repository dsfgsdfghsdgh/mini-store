import { passwordHasher } from "../../common/utils/bcrypt"
import { BAD_REQUEST } from "../../constants/httpCode"
import prisma from "../../database/dbConnect"
import appAssert from "../../middlewares/appAssert.middleware"


type registerUserServiceProps = {
  avatar: string,
  email: string,
  password: string,
}


export const registerUserService =async(data:registerUserServiceProps )=>{
  //check if existing user 
  const userExists = await prisma.user.findFirst({
    where: { email: data.email },
  })

  appAssert(!userExists, BAD_REQUEST, "user already exists ")

  const hashedPassword = await passwordHasher(data.password)

  const user = await prisma.user.create({
    data:{
      avatar: data.avatar,
      email: data.email,
      password: hashedPassword,
    }
  })

  const {password, ...rest} = user

  return {
    user: rest
  }
}