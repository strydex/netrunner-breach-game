// does what it says on the tin
// checks if an object / array is empty, return boolean value ==> empty = true
export function isObjectEmpty(obj: Record<string, unknown>){
    return Object.keys(obj).length === 0;
}

export function isArrayEmpty(arr: unknown[]){
    return arr.length === 0;
}
