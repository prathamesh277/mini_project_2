import notes from "../images/notes.svg";
import Button from "@material-ui/core/Button";
import { Home, Notes } from "@material-ui/icons";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useState } from "react";
import { Link,useHistory} from "react-router-dom";
var clientId = `29475417745-9l3a67nmjr6sh7thso5sjb2pir60jk9o.apps.googleusercontent.com`;
var loginStatus = false;
var response = [];
const Nav = (props) => {
  const his = useHistory()
  const [showLogin, setShowLoginBtn] = useState(true);
  const responseGoogle = (response) => {
    console.log(response);
  };
  const responseGoogleSuccess = (res) => {
    setShowLoginBtn(false)
    loginStatus = true;
    response = res.profileObj;
  };
  const logout = () => {
    setShowLoginBtn(true)
    loginStatus = false;
    response = [];
    his.push('/')
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={notes} alt="website title" className="notes-icon" />
        <a href="/" className="navbar-title">
          Notes
        </a>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/">
            <Button variant="contained" startIcon={<Home />}>
              Home
            </Button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Notes">
            <Button variant="contained" startIcon={<Notes />}>
              Notes
            </Button>
          </Link>
           
        </li>
        <li className="nav-item">
          {showLogin ? (
            <GoogleLogin
              clientId={clientId}
              buttonText="Login"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              isSignedIn= {true}
            />
            
          ) : (
            <GoogleLogout
              clientId={clientId}
              buttonText="Logout"
              onLogoutSuccess={logout}
            />
          )}
        </li>
      </ul>
      <div className="hamburger">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};
export default Nav;
export { loginStatus };
export { response };

