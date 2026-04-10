// having a oneliner as an exported function is a genius move /s
// returns boolean
export function passwdParser(netLoc: any, command: string){
    return command === netLoc._password;
}
