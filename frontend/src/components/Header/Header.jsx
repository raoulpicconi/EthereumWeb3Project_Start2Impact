import { HashRouter as Router, Route, Link, Routes } from "react-router-dom"
import Homepage from "../Home/Homepage"
import Marketplace from "../Marketplace/Marketplace"
import Userpage from "../User/Userpage"
import Minter from "../Minter/Minter"
import NetworkSwitch from "./components/NetworkSwitch"
import MenuButton from "./components/MenuButton"
import { useContext, useState } from "react"
import { UserContext } from "../../App"

function Header() {
  const [hiddenMenu, setHiddenMenu] = useState("hidden")
  const [hiddenPage, setHiddenPage] = useState("")
  const { address } = useContext(UserContext)

  function changeVisibility() {
    if (hiddenMenu == "hidden") {
      setHiddenMenu("")
      setHiddenPage("hidden")
    } else {
      setHiddenMenu("hidden")
      setHiddenPage("")
    }
  }

  return (
    <>
      <Router>
        <header className="flex justify-between items-center p-1 text-blue-400">
          <h1 className={`font-bold text-blue-200 text-2xl ${hiddenPage}`}>Dex NFT</h1>
          <div className="flex justify-around items-center">
            <ul
              onClick={() => {
                if (hiddenMenu == "") {
                  changeVisibility()
                }
              }}
              className={`h-1/2 ${
                hiddenMenu == "" && "w-screen"
              } flex flex-col ${hiddenMenu} justify-center items-center py-20 pb-80 md:w-auto md:h-auto md:mx-10 md:p-0 md:flex md:flex-row`}
            >
              <li className="px-4 m-5">
                <Link to="/">Home</Link>
              </li>
              <li className="px-4 m-5">
                <Link to="/user">Profile</Link>
              </li>
              <li className="px-4 m-5">
                <Link to="/marketplace">Marketplace</Link>
              </li>
              <li className="px-4 m-5">
                <Link to="/minter">Minter</Link>
              </li>
            </ul>
            <div className={`${hiddenPage}`}>
              <NetworkSwitch />
            </div>
            <div
              className={`mx-1 md:mx-3 p-1 md:p-2 rounded border-2 border-blue-700 text-blue-700 ${hiddenPage}`}
            >
              {address
                ? address.slice(0, 6).toLowerCase() + "..." + address.slice(-6).toLowerCase()
                : ""}
            </div>
            <div className={hiddenPage == "hidden" ? "fixed top-0 right-0" : "static inset-0"}>
              <MenuButton
                hiddenMenu={hiddenMenu}
                setHiddenMenu={setHiddenMenu}
                setHiddenPage={setHiddenPage}
              />
            </div>
          </div>
        </header>
        <div className={`${hiddenPage}`}>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/user" element={<Userpage />} />
            <Route exact path="/marketplace" element={<Marketplace />} />
            <Route exact path="/minter" element={<Minter />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}
export default Header
