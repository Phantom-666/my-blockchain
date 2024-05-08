import { Button, Container, TextField } from "@radix-ui/themes"
import "./Login.css"
import { useState } from "react"

export default function Login({ login }: { login: any }) {
  const [privateKey, setPrivateKey] = useState("")

  const loginHandle = () => {
    login(privateKey)
  }

  return (
    <>
      <Container size="1">
        <h1>Private key</h1>
        <TextField.Root
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="Place you private key"
        >
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        <div style={{ fontSize: "10px", marginTop: "5px" }}>
          For example :
          cf112f04929aedfc922ff2f7674cbb83f0a6b81c5ca5e77243abf038561a6060
        </div>
        <Button style={{ marginTop: "10px" }} onClick={loginHandle}>
          Login
        </Button>
      </Container>
    </>
  )
}
