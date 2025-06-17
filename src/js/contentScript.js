import {getUsernameInput, getPasswordInput} from "./utils/inputs.js";

const autoFillSignIn = ({username, password}) => {
    
    const usernameInput = getUsernameInput()
    const passwordInput = getPasswordInput()

    if (usernameInput) {
        usernameInput.value = username
    }
    
    if (passwordInput) {
        passwordInput.value = password
    }
}

chrome.runtime.onMessage.addListener((message) => {
    console.log("message", message)
    autoFillSignIn(message)
})