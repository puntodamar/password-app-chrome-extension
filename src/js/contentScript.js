const autoFillSignIn = ({username, password}) => {
    document.querySelector('input[type="text"]').value = username
    document.querySelector('input[type="password"]').value = password
}

chrome.runtime.onMessage.addListener((message) => {
    console.log("message", message)
    autoFillSignIn(message)
})