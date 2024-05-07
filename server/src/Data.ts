import { SHA256 } from "crypto-js"
import EC from "elliptic"

const ec = new EC.ec("secp256k1")

class Transaction {
  private signature: string | null = null
  constructor(
    public from: string | null,
    public to: string,
    public amount: number
  ) {}

  private calcHash() {
    return SHA256(this.from + this.to + this.amount).toString()
  }

  signTransaction(signingKey: EC.ec.KeyPair) {
    if (signingKey.getPublic("hex") !== this.from) {
      throw new Error("Invalid signature")
    }

    const hastTx = this.calcHash()

    const sig = signingKey.sign(hastTx, "base64")
    this.signature = sig.toDER("hex")
  }

  isValid() {
    if (this.from === null) return true

    if (!this.signature || this.signature.length === 0)
      throw new Error("Invalid signature")

    const publicKey = ec.keyFromPublic(this.from, "hex")

    return publicKey.verify(this.calcHash(), this.signature)
  }
}

export { Transaction }
