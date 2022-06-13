import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient"



interface IAuthenticateClient{
    username:string,
    password:string
}


export class AuthenticateClientUseCase{

    async execute({username,password}:IAuthenticateClient){
      
//Verificar se o username está cadastrado
const client = await prisma.client.findFirst({
    where:{
        username
    }
})
if(!client){
    throw new Error("username or password invalid!");    
}

//verificar se a senha corresponde ao username
const passwordMatch= await compare(password, client.password)
if(!passwordMatch){
    throw new Error("username or password invalid!");    
}     

// gerar token
const token = sign({username}, "5f65c3eb1b98f636d3c797ec5ccc151d",{
    subject:client.id,
    expiresIn: "1d"
    })
    return token
    }
}