import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/CreateClientController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/CreateDeliverymanController";
import { CreateDeliveryController } from './modules/deliveries/createDelivery/CreateDeliveryController';


const routes =Router()

const createClientController = new CreateClientController()
const authenticateClientController =  new AuthenticateClientController()

const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()

const createDeliveryController = new CreateDeliveryController()

//client routes
routes.post ('/client/signup', createClientController.handler)
routes.post ('/client/signin', authenticateClientController.handler)

//deliveryman routes
routes.post ('/deliveryman/signup', createDeliverymanController.handler)
routes.post ('/deliveryman/signin', authenticateDeliverymanController.handler)

//deliveries routes
routes.post ('/delivery/create', createDeliveryController.handler)



export {routes}