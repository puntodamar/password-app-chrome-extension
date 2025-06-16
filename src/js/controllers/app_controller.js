import {Controller} from "@hotwired/stimulus";
import {getSessionStorage} from "../services/storage_service.js";

class AppController extends Controller {
    async connect() {
        const token = await getSessionStorage("token");
        if (token) {
            Turbo.visit("/frames/entries.html", { frame: "app" });
        }
    }
}

export default AppController;