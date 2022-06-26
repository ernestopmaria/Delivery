import { Request, Response } from "express";
import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";



export class AuthenticateClientController{

async handle(request:Request, response:Response) {
    const authenticateClientUseCase = new AuthenticateClientUseCase()
    const { username, password}= request.body

    const client = await authenticateClientUseCase.execute({username,password})

    return response.json(client)
    
}
}