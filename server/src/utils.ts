import EC from "elliptic"
const ec = new EC.ec("secp256k1")

const key = ec.genKeyPair()
const publicKey = key.getPublic("hex")
const privateKey = key.getPrivate("hex")

console.log("publicKey", publicKey)
console.log("privateKey", privateKey)

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export { randomIntFromInterval }
