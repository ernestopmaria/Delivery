import { Request, Response } from "express";
import { CreateClientUseCase } from "./CreateClientUseCase";


export class CreateClientController{

async handler(request:Request, response:Response) {
    const createClientUseCase = new CreateClientUseCase()
    const { username, password}= request.body

    const client = await createClientUseCase.execute({username,password})

    return response.json(client)
    
}
}