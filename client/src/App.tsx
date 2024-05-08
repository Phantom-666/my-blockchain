import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import { useLogin } from "./hooks/useLogin"
import RoutesNav from "./components/RoutesNav/RoutesNav"

function App() {
  const { login, privateKey, publicKey, signOut } = useLogin()

  return (
    <div className="App">
      <Router>
        <header>
          <Navbar publicKey={publicKey} signOut={signOut} />
        </header>
        <main>
          <RoutesNav
            publicKey={publicKey}
            privateKey={privateKey}
            login={login}
          />
        </main>
      </Router>
    </div>
  )
}

export default App
