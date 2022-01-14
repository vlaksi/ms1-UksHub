// TODO: Change token name to smth more Domain oriented
const TOKEN_NAME = "token"

export function getToken() {
    return localStorage.getItem(TOKEN_NAME);
}

export function saveToken(token) {    
    localStorage.setItem(TOKEN_NAME, token);
}

export function getParsedToken() {
    let token = localStorage.getItem(TOKEN_NAME);
    var base64Payload = token.split(".")[1];
    var payload = Buffer.from(base64Payload, "base64");
    return JSON.parse(payload.toString());
}

export function removeToken() {
    localStorage.removeItem(TOKEN_NAME);
}