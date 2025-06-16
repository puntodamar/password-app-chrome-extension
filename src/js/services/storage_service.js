const setSessionStorage = async (value) => {
    return new Promise((resolve) => chrome.storage.session.set(value, resolve))
};

const getSessionStorage = async (key) => {
    return new Promise(resolve => chrome.storage.session.get([key], result => resolve(result[key])))
}

export {setSessionStorage, getSessionStorage}