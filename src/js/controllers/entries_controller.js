import {Controller} from "@hotwired/stimulus";
import {getSessionStorage} from "../services/storage_service.js";
import {fetchEntries} from "../services/entries_service.js";
import {sidebar, main} from "../templates/entries_template.js";

class EntriesController extends Controller {

    static targets = ["sidebar", "main"]

    async connect() {
        const token = await getSessionStorage("token");
        if (!token) {
            document.dispatchEvent(new CustomEvent("auth:signOut"));
            return;
        }

        const entries = await fetchEntries();

        try{
            this.sidebarTarget.innerHTML = sidebar(entries)
            this.mainTarget.innerHTML = main(entries[0])
        }
         catch(err){
            console.error(err);
            return
         }
    }

    updateMain({params}) {
        this.mainTarget.innerHTML = main(params.entry)
    }
    
    
}

export default EntriesController;