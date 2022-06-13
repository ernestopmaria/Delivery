import { hash } from "bcrypt"
import { prisma } from "../../../database/prismaClient"

interface ICreateClient{
username:string,
password:string
}

export class CreateClientUseCase{

    async execute({username, password}:ICreateClient){

        //Validar se o usuario existe
        const clientExist =await prisma.client.findFirst({
            where:{
                username:{
                    equals: username,
                    mode:"insensitive"
                }
            }
        })
        if(clientExist){
            throw new Error("Client already exists")
        }

        //criptografar senha
        const hashPassword = await hash(password, 10)

        //Salvar o client
       const client = await prisma.client.create({
            data:{
                username,
                password:hashPassword
            }
        })

        return client
    }
}