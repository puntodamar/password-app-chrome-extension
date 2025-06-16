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
         
         const [activeTab] = await chrome.tabs.query({active: true, currentWindow: true});
        
        if (!activeTab) {
            return
        }
        
        let parsedUrl
        try {
            parsedUrl = new URL(activeTab.url);
        } catch(error) {
            console.log("Invalid url in active tab", error);
        }
        
        const activeEntry = entries.find(entry => entry.url.includes(parsedUrl.hostname));
        if (activeEntry) {
            this.mainTarget.innerHTML = main(activeEntry);
        }
    }

    updateMain({params}) {
        this.mainTarget.innerHTML = main(params.entry)
    }
    
    navigateToLogin({params}){
        chrome.tabs.create({url: params.entry.url})
    }
    
    
    async fillInCredentials({params}) {
        const [activeTab] = await chrome.tabs.query({active: true, currentWindow: true});
        
        if (!activeTab) {
            return
        }

        
        let parsedUrl
        try {
            parsedUrl = new URL(activeTab.url);
        } catch(error) {
            console.log("Invalid url in active tab", error);
            return
        }

        const activeEntry = parsedUrl.href.includes(params.entry.url)
        
        if (activeEntry) {
            chrome.tabs.sendMessage(activeTab.id, {
                username: params.entry.username,
                password: params.entry.password,
            })
        }
    }
    
    
}

export default EntriesController;


// const autoFillSignIn = ({username, password}) => {
//     document.querySelector('input[name="text"]').value = username
//     document.querySelector('input[name="password"]').value = password
// }
//
// chrome.runtime.onMessage.addListener((message) => autoFillSignIn(message))