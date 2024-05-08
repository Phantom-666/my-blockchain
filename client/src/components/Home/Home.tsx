import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Callout, Container, Flex, Spinner } from "@radix-ui/themes"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Home({ publicKey }: { publicKey: string }) {
  const [balance, setBalance] = useState<string | null>(null)
  const [transactions, setTransactions] = useState<
    {
      amount: string
      from: string
      signature: string
      to: string
    }[]
  >([])

  useEffect(() => {
    axios
      .post("/api/get_transactions", { address: publicKey })
      .then((res) => {
        console.log(res.data.transactions)

        setTransactions(res.data.transactions)
      })
      .catch((err) => console.log(err))
  }, [publicKey])

  useEffect(() => {
    axios
      .post("/api/get_balance", { address: publicKey })
      .then((res) => setBalance(res.data.balance.toString()))
      .catch((err) => console.log(err))
  }, [publicKey])

  return (
    <>
      <Container size="1">
        <h1>Profile</h1>
        <p>
          <span style={{ fontWeight: "bold" }}>Address : </span>
          {publicKey}
        </p>
        <h3>Balance : {balance ? balance : <Spinner />}</h3>

        <h1>Transactions</h1>

        <Flex direction="column" gap="3">
          {transactions.map((t) => (
            <>
              {t.to === publicKey ? (
                <>
                  <Callout.Root color="green">
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                      {t.from === null
                        ? `For mining +${t.amount}`
                        : `From ${t.from.substring(0, 25)} +${t.amount}`}
                    </Callout.Text>
                  </Callout.Root>
                </>
              ) : (
                <>
                  <Callout.Root color="red">
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                      {t.amount} coins to address {t.to.substring(0, 25)}
                    </Callout.Text>
                  </Callout.Root>
                </>
              )}
            </>
          ))}
        </Flex>
      </Container>
    </>
  )
}
