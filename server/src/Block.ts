import { SHA256 } from "crypto-js"
import { Transaction } from "./Data"

class Block {
  private hash: string = ""

  constructor(
    private timestamp: number,
    private transaction: Transaction[],
    private previousHash: string = "",
    private nonce = 0
  ) {}

  public getTransaction() {
    return this.transaction
  }

  public getPreviousHash() {
    return this.previousHash
  }

  public setPreviousHash(hash: string) {
    this.previousHash = hash
  }

  public calcHash() {
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transaction) +
        this.nonce
    ).toString()
  }

  public getHash() {
    return this.hash
  }

  public setHash(hash: string) {
    this.hash = hash
  }

  //proof-of-work
  public mineBlock(difficulty: number) {
    const validArr = Array(difficulty + 1).join("0")

    while (this.hash.substring(0, difficulty) !== validArr) {
      this.nonce++
      this.hash = this.calcHash()
    }
    console.log("Block mined - " + this.hash)
  }

  public hasValidTransactions() {
    for (const tx of this.transaction) {
      if (!tx.isValid()) {
        return false
      }
    }
    return true
  }
}

export { Block }
