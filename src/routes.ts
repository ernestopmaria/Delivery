import { UpdateDeliverymanController } from './modules/deliveries/updateDeliveryman/useCases/UpdateDeliverymanController';
import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/CreateClientController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/CreateDeliverymanController";
import { CreateDeliveryController } from './modules/deliveries/createDelivery/CreateDeliveryController';
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { FindAllAvailableController } from './modules/deliveries/findAllAvailable/FindAllAvailableController';
import { ensureauthenticateDeliveryman } from "./middlewares/ensureauthenticateDeliveryman";


const routes =Router()

const createClientController = new CreateClientController()
const authenticateClientController =  new AuthenticateClientController()

const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()

const createDeliveryController = new CreateDeliveryController()
const findAllAvailableController = new FindAllAvailableController()
const updateDeliverymanController = new UpdateDeliverymanController()


//client routes
routes.post ('/client/signup', createClientController.handle)
routes.post ('/client/signin', authenticateClientController.handle)

//deliveryman routes
routes.post ('/deliveryman/signup', createDeliverymanController.handle)
routes.post ('/deliveryman/signin', authenticateDeliverymanController.handle)

//deliveries routes
routes.post ('/delivery/create', ensureAuthenticateClient, createDeliveryController.handle)
routes.get ('/delivery/available', ensureauthenticateDeliveryman,  findAllAvailableController.handle)
routes.put ('/delivery/update/:id', ensureauthenticateDeliveryman,  updateDeliverymanController.handle)


export {routes}