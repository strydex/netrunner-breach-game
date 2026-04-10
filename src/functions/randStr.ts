// having a go at a random string generator becuase why not
// also i like random strings that are more than alphanumerical

const characters =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!£$%^&*~:#@?.=-_|+=ŧøæßðđŋł¢";

export function genRand(length: number) {
  let rand = "";
  for (let i = 0; i < length; i++) {
    const randNum = Math.floor(Math.random() * characters.length);
    rand += characters.slice(randNum, randNum + 1);
  }
  return rand;
}
