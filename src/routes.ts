import { UpdateEndDateController } from './modules/deliveries/updateEndDate/UpdateEndDateController';
import { UpdateDeliverymanController } from './modules/deliveries/updateDeliveryman/useCases/UpdateDeliverymanController';
import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/createClient/CreateClientController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { CreateDeliveryController } from './modules/deliveries/createDelivery/CreateDeliveryController';
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { FindAllAvailableController } from './modules/deliveries/findAllAvailable/FindAllAvailableController';
import { ensureauthenticateDeliveryman } from "./middlewares/ensureauthenticateDeliveryman";
import { FindAllDeliveriesController } from './modules/clients/deliveries/FindAllDeliveriesController';
import { FindAllDeliveriesDeliverymanController } from './modules/deliveryman/useCases/finAllDeliveries/FindAllDeliveriesDeliverymanController';


const routes =Router()

const createClientController = new CreateClientController()
const authenticateClientController =  new AuthenticateClientController()

const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()

const createDeliveryController = new CreateDeliveryController()
const findAllAvailableController = new FindAllAvailableController()
const updateDeliverymanController = new UpdateDeliverymanController()
const findAllDeliveriesClientController= new FindAllDeliveriesController()

const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController()
const updateEndDate = new UpdateEndDateController()


//client routes
routes.post ('/client/signup', createClientController.handle)
routes.post ('/client/signin', authenticateClientController.handle)
routes.get ('/client/deliveries', ensureAuthenticateClient, findAllDeliveriesClientController.handle)

//deliveryman routes
routes.post ('/deliveryman/signup', createDeliverymanController.handle)
routes.post ('/deliveryman/signin', authenticateDeliverymanController.handle)
routes.get ('/deliveryman/deliveries', ensureauthenticateDeliveryman, findAllDeliveriesDeliverymanController.handle)


//deliveries routes
routes.post ('/delivery/create', ensureAuthenticateClient, createDeliveryController.handle)
routes.get ('/delivery/available', ensureauthenticateDeliveryman,  findAllAvailableController.handle)
routes.put ('/delivery/update/:id', ensureauthenticateDeliveryman,  updateDeliverymanController.handle)
routes.put ('/delivery/updateEndDate/:id', ensureauthenticateDeliveryman,  updateEndDate.handle)


export {routes}