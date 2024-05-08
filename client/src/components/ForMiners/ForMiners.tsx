import { Badge, Button, Container, Flex } from "@radix-ui/themes"
import axios from "axios"
import { useEffect, useState } from "react"

export default function ForMiners({ publicKey }: { publicKey: string }) {
  const [blockName, setBlockName] = useState(null)
  const [miningReward, setMiningReward] = useState()
  const [amountOfTransactions, setAmountOfTransactions] = useState(0)
  const [response, setResponse] = useState(null)

  useEffect(() => {
    axios
      .get("/api/current_block")
      .then((res) => {
        const { block, pendingTransactionsLength, reward } = res.data

        setBlockName(block.hash)
        setMiningReward(reward)
        setAmountOfTransactions(pendingTransactionsLength)
      })
      .catch((err) => console.log(err))
  }, [])

  const mineBlock = async () => {
    const res = await axios.post("/api/mine", { address: publicKey })

    setResponse(res.data.status)
  }

  return (
    <>
      <Container size="1">
        <h1>Current block : </h1> <span>{blockName}</span>
        <h2>Amount for mining : {miningReward}</h2>
        <h2>Amount of transactions : {amountOfTransactions}</h2>
        {response && (
          <Flex gap="2">
            <Badge color="green">{response}</Badge>
          </Flex>
        )}
        <Button style={{ marginTop: "10px" }} onClick={mineBlock}>
          Mine current block
        </Button>
      </Container>
    </>
  )
}
