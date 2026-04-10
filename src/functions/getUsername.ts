// called in data files to assign username to game data
// if username exists in locat storage, return just the name portion
export function getUsername(): string{
    const storageUsername = window.localStorage.getItem("username");
    if (storageUsername){
        const username = storageUsername.split("@");
        return username[0];
    }
    return "";
}
