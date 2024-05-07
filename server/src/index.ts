import { Blockchain } from "./Blockchain"
import { Transaction } from "./Data"

//TODO: client

import EC from "elliptic"
const ec = new EC.ec("secp256k1")

const run = () => {
  //client

  const myKey = ec.keyFromPrivate(
    "cf112f04929aedfc922ff2f7674cbb83f0a6b81c5ca5e77243abf038561a6060"
  )

  const myWalletAddress = myKey.getPublic("hex")

  //- client
  const myBlockchain = new Blockchain()

  const tx1 = new Transaction(myWalletAddress, "someone", 10)
  tx1.signTransaction(myKey)
  myBlockchain.addTransaction(tx1)
  myBlockchain.minePendingTransactions(myWalletAddress)

  console.log(JSON.stringify(myBlockchain, null, 4))

  const tx2 = new Transaction(myWalletAddress, "someone", 10)
  tx2.signTransaction(myKey)
  myBlockchain.addTransaction(tx2)
  myBlockchain.minePendingTransactions(myWalletAddress)

  console.log("isChainValid", myBlockchain.isChainValid())
  console.log("Balance", myBlockchain.getBalance(myWalletAddress))
}

run()
