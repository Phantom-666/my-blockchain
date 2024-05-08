import { Request, Response } from "express"
import { Transaction } from "../Data"
import myBlockchain from "../blockchainInit"

export default {
  addTransaction: (req: Request, res: Response) => {
    const {
      myWalletAddress,
      toWalletAddress,
      amount,
      signature,
    }: {
      myWalletAddress: string
      toWalletAddress: string
      amount: number
      signature: string
    } = req.body

    const tx = new Transaction(myWalletAddress, toWalletAddress, Number(amount))

    tx.signTransactionWithSignature(signature)
    myBlockchain.addTransaction(tx)

    res
      .status(200)
      .json({ ...tx, status: "Success, wait for block to be mined" })
  },

  getBalance: (req: Request, res: Response) => {
    const { address } = req.body

    const balance = myBlockchain.getBalance(address)

    res.status(200).json({ balance })
  },

  getTransactions: (req: Request, res: Response) => {
    const { address } = req.body

    const transactions = myBlockchain.getTransactions(address)
    res.status(200).json({ transactions })
  },

  getCurrentBlockData: (req: Request, res: Response) => {
    const block = myBlockchain.getLatestBlock()
    const pendingTransactionsLength =
      myBlockchain.getPendingTransactionsLength()
    const reward = myBlockchain.getMiningReward()

    res.status(200).json({ block, pendingTransactionsLength, reward })
  },

  mineBlock: (req: Request, res: Response) => {
    const { address } = req.body

    myBlockchain.minePendingTransactions(address)

    res.status(200).json({ status: "Block mined" })
  },
}
