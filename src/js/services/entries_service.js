import {getSessionStorage} from "./storage_service.js";

const fetchEntries = async () => {
    try {
        const token = await getSessionStorage("token");
        const response = await fetch("http://localhost:3000/api/v1/entries", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });

        const entries =  await response.json();
        if (response.status === 401) {
            document.dispatchEvent(new CustomEvent("auth:signOut"));
        } else {
            return entries;
        }
    }
     catch (error) {
        console.log(error);
     }
}

export {fetchEntries};