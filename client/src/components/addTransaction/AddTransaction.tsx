import { Badge, Button, Container, Flex, TextField } from "@radix-ui/themes"
import axios from "axios"
import { useState } from "react"
import EC from "elliptic"
import { SHA256 } from "crypto-js"

export default function AddTransaction({ privateKey }: { privateKey: string }) {
  const [sendTo, setSendTo] = useState("")
  const [amount, setAmount] = useState("")

  const [response, setResponse] = useState("")

  const calcHash = (from: string, to: string, amount: string) => {
    return SHA256(from + to + amount).toString()
  }

  const addTransaction = async () => {
    const ec = new EC.ec("secp256k1")

    const myKey = ec.keyFromPrivate(privateKey)

    const myWalletAddress = myKey.getPublic("hex")
    const hastTx = calcHash(myWalletAddress, sendTo, amount)

    const sig = myKey.sign(hastTx, "base64")
    const signature = sig.toDER("hex")

    const body = { myWalletAddress, toWalletAddress: sendTo, amount, signature }

    const res = await axios.post("/api/add_transaction", body)

    setResponse(res.data.status)
    setSendTo("")
    setAmount("0")
  }

  return (
    <>
      <Container size="1">
        <h1>Add Transaction</h1>
        {response && (
          <Flex gap="2">
            <Badge color="green">{response}</Badge>
          </Flex>
        )}

        <TextField.Root
          style={{ marginTop: "10px" }}
          value={sendTo}
          onChange={(e) => setSendTo(e.target.value)}
          placeholder="Send to"
        >
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        <TextField.Root
          style={{ marginTop: "10px" }}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        >
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        <Button style={{ marginTop: "10px" }} onClick={addTransaction}>
          Submit
        </Button>
      </Container>
    </>
  )
}
