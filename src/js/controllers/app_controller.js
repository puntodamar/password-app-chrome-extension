import {Controller} from "@hotwired/stimulus";

class AppController extends Controller {
    connect() {
        const token = false;
        if (token) {
            Turbo.visit("/frames/entries.html", {frame: "app"})
        }
    }
}

export default AppController;