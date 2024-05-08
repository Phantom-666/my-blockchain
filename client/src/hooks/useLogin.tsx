import { useEffect, useState } from "react"
import EC from "elliptic"
const privateKeyName = "privateKey"

export const useLogin = () => {
  const [privateKey, setPrivateKey] = useState<string | null>(null)
  const [publicKey, setPublicKey] = useState<string | null>(null)

  const ec = new EC.ec("secp256k1")

  useEffect(() => {
    const privateKey = localStorage.getItem(privateKeyName)

    if (privateKey) {
      setPrivateKey(privateKey)
      const myKey = ec.keyFromPrivate(privateKey)
      const myWalletAddress = myKey.getPublic("hex")
      setPublicKey(myWalletAddress)
    }
  }, [])

  const login = (privateKey: string) => {
    setPrivateKey(privateKey)

    const myKey = ec.keyFromPrivate(privateKey)
    const myWalletAddress = myKey.getPublic("hex")
    setPublicKey(myWalletAddress)
    localStorage.setItem(privateKeyName, privateKey)
  }

  const signOut = () => {
    localStorage.setItem(privateKeyName, "")
    setPrivateKey(null)
    setPublicKey(null)
  }

  return { privateKey, publicKey, login, signOut }
}
