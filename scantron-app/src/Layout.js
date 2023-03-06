import { Outlet, Link } from "react-router-dom";
import SluLogo from "./slu-2-centered-blue-rgb.png"

const Layout = () => {
  return (
    <>
    <img src={SluLogo} className="slu-logo"></img>
    <h1 className="title-header main-title">Scantron Software</h1>
      {/* <nav>        
        <ul className="navigation">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
        </ul>
      </nav> 
        <br></br>
        <br></br>
        <br></br>
        <br></br>*/}


      <Outlet />
      <footer className="mastfoot mt-auto">
            <div className="inner">
                <p>Visit us at <a href="https://www.slu.edu/" target="_self" className="kick">SLU</a>.</p>
            </div>
        </footer>
    </>
  )
};

export default Layout;