import { Router } from "express"
import blockchainController from "../controllers/blockchain.controller"

const router = Router()

router.post("/get_balance", blockchainController.getBalance)
router.post("/add_transaction", blockchainController.addTransaction)
router.post("/get_transactions", blockchainController.getTransactions)
router.get("/current_block", blockchainController.getCurrentBlockData)
router.post("/mine", blockchainController.mineBlock)

export default router
