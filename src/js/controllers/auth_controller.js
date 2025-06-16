import {Controller} from "@hotwired/stimulus";
import {setSessionStorage} from "../services/storage_service.js";

class AuthController extends Controller {
    static targets = ["flash", "email", "password"]

    async signIn() {
        try {
            const response = await fetch("http://localhost:3000/api/v1/auth", {
                method: "POST",
                body: JSON.stringify({email: this.emailTarget.value, password: this.passwordTarget.value}),
                headers: {"Content-Type": "application/json"}
            })

            const data = await response.json();
            if (data.errors) {
                this.flashTarget.innerHTML = `<div class="p-3 bg-danger text-white rounder my-3">${data.errors[0]}</div>`
            }

            if (data.token) {
                await setSessionStorage({token: data.token});
                Turbo.visit("/frames/entries.html", {frame: "app"})
            }

        }
        catch (error) {
            const message = error.message || error.toString()
            this.flashTarget.innerHTML = `<div class="p-3 bg-danger text-white rounder my-3">${message}</div>`
        }
    }
}


export default AuthController;