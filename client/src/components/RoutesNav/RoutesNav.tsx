import { Routes, Route } from "react-router-dom"
import Home from "../Home/Home"
import AddTransaction from "../addTransaction/AddTransaction"
import Login from "../Login/Login"
import ForMiners from "../ForMiners/ForMiners"

export default function RoutesNav({
  publicKey,
  login,
  privateKey,
}: {
  publicKey: string | null
  login: any
  privateKey: string | null
}) {
  return (
    <>
      {publicKey ? (
        <Routes>
          <Route path="/" element={<Home publicKey={publicKey} />} />
          <Route
            path="/add_transaction"
            element={<AddTransaction privateKey={privateKey!} />}
          />
          <Route
            path="/for_miners"
            element={<ForMiners publicKey={publicKey} />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login login={login} />} />
        </Routes>
      )}
    </>
  )
}
