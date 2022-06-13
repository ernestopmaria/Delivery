import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";

const routes =Router()

const createClientController = new CreateClientController()
const authenticateClientController =  new AuthenticateClientController

routes.post ('/client/signup', createClientController.handler)
routes.post ('/client/signin', authenticateClientController.handler)


export {routes}