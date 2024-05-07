import { Block } from "./Block"
import { Transaction } from "./Data"

class Blockchain {
  private chain = [this.createGenesisBlock()]
  private pendingTransactions: Transaction[] = []
  private miningReward = 100

  private difficulty = 2

  constructor() {}

  private createGenesisBlock() {
    const block = new Block(Date.now(), [], "0")

    block.setHash(block.calcHash())

    return block
  }

  private getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  minePendingTransactions(miningRewardAddress: string) {
    this.pendingTransactions.push(
      new Transaction(null, miningRewardAddress, this.miningReward)
    )

    const block = new Block(Date.now(), this.pendingTransactions)
    block.setPreviousHash(this.getLatestBlock().getHash())
    block.mineBlock(this.difficulty)
    this.chain.push(block)

    this.pendingTransactions = []

    // this.pendingTransactions = [
    //   new Transaction(null, miningRewardAddress, this.miningReward),
    // ]
  }

  addTransaction(transaction: Transaction) {
    if (!transaction.from || !transaction.to)
      throw new Error("Invalid transation")

    if (!transaction.isValid()) throw new Error("Invalid transaction")

    this.pendingTransactions.push(transaction)
  }

  getBalance(address: string) {
    let balance = 0

    for (const block of this.chain) {
      for (const trans of block.getTransaction()) {
        if (trans.from === address) {
          balance -= trans.amount
        }

        if (trans.to === address) {
          balance += trans.amount
        }
      }
    }

    return balance
  }

  public isChainValid() {
    for (let i = 1; i < this.chain.length; ++i) {
      const currentBlock = this.chain[i]
      const prevBlock = this.chain[i - 1]

      if (!currentBlock.hasValidTransactions()) {
        return false
      }

      if (currentBlock.getHash() !== currentBlock.calcHash()) {
        return false
      }

      if (currentBlock.getPreviousHash() !== prevBlock.getHash()) {
        return false
      }
    }

    return true
  }
}

export { Blockchain }
