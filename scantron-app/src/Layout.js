import { Outlet } from "react-router-dom";
import SluLogo from "./slu-2-centered-blue-rgb.png"

const Layout = () => {
  return (
    <>
    <img src={SluLogo} className="slu-logo" alt="Saint Louis University Logo"></img>
    <h1 className="title-header main-title">Scantron Software</h1>

      <Outlet />
    </>
  )
};

export default Layout;