import { application } from '../application'
import AppController from "./app_controller.js";
import AuthController from "./auth_controller.js";
import EntriesController from "./entries_controller.js";
import SearchController from "./search_controller.js";

import ClipboardController from "./clipboard_controller.js";

application.register("app", AppController);
application.register("auth", AuthController);
application.register("entries", EntriesController);
application.register("search", SearchController);
application.register("clipboard", ClipboardController);