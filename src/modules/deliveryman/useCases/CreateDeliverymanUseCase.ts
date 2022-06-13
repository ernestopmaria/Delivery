import { hash } from "bcrypt"
import { prisma } from "../../../database/prismaClient"

interface ICreateDeliveryman{
    username:string,
    password:string
}



export class CreateDeliverymanUseCase{

    async execute({username, password}:ICreateDeliveryman){

        //Validar se o deliveryman existe
        const deliverymanExist =await prisma.deliveryman.findFirst({
            where:{
                username:{
                    mode:"insensitive"
                }
            }
        })
        if(deliverymanExist){
            throw new Error("Deliveryname already exists")
        }

        //criptografar senha
        const hashPassword = await hash(password, 10)

        //Salvar o deliveryman
       const deliveryman = await prisma.deliveryman.create({
            data:{
                username,
                password:hashPassword
            }
        })

        return deliveryman
    }
}