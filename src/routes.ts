import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserReceiverComplimentsController } from "./controllers/ListUserReceiverComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimenteController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post('/users', ensureAuthenticated, createUserController.handle);

router.get('/users', listUsersController.handle);

router.post('/tags', 
  ensureAuthenticated, 
  ensureAdmin, 
  createTagController.handle
);

router.get('/tags', ensureAuthenticated, listTagsController.handle);

router.post('/compliments', 
  ensureAuthenticated, 
  createComplimenteController.handle
);

router.post('/login', authenticateUserController.handle);

router.get('/users/compliments/send', 
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);

router.get('/users/compliments/receiver',
  ensureAuthenticated,
  listUserReceiverComplimentsController.handle
);

export { router };
