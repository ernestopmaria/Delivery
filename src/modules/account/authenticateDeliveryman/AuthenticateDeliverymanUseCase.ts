import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient"



interface IAuthenticateDeliveryman{
    username:string,
    password:string
}


export class AuthenticateDeliverymanUseCase{

    async execute({username,password}:IAuthenticateDeliveryman){
      
//Verificar se o username está cadastrado
const deliveryman = await prisma.deliveryman.findFirst({
    where:{
        username
    }
})
if(!deliveryman){
    throw new Error("username or password invalid!");    
}

//verificar se a senha corresponde ao username
const passwordMatch= await compare(password, deliveryman.password)
if(!passwordMatch){
    throw new Error("username or password invalid!");    
}     

// gerar token
const token = sign({username}, "0868b879b4b257dae1fad9b7afaa2427",{
    subject:deliveryman.id,
    expiresIn: "1d"
    })
    return token
    }
}