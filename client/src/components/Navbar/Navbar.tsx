import { TabNav } from "@radix-ui/themes"
import { useLocation, useNavigate } from "react-router-dom"
import "./Navbar.css"

export default function Navbar({
  publicKey,
  signOut,
}: {
  publicKey: string | null
  signOut: any
}) {
  const nav = useNavigate()
  const location = useLocation()

  return (
    <TabNav.Root>
      {publicKey ? (
        <>
          <TabNav.Link
            onClick={() => nav("/")}
            active={location.pathname === "/"}
          >
            Account
          </TabNav.Link>
          <TabNav.Link
            onClick={() => nav("/add_transaction")}
            active={location.pathname === "/add_transaction"}
          >
            Add transaction
          </TabNav.Link>
          <TabNav.Link
            onClick={() => nav("/for_miners")}
            active={location.pathname === "/for_miners"}
          >
            For miners
          </TabNav.Link>
          <TabNav.Link
            onClick={() => {
              signOut()
              nav("/")
            }}
          >
            Sign out
          </TabNav.Link>
        </>
      ) : (
        <>
          <TabNav.Link
            onClick={() => nav("/")}
            active={location.pathname === "/"}
          >
            Login
          </TabNav.Link>
        </>
      )}
    </TabNav.Root>
  )
}
