import { application } from '../application'
import AppController from "./app_controller.js";
import AuthController from "./auth_controller.js";

application.register("app", AppController);
application.register("auth", AuthController);