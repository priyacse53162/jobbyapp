import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

const Header = props => {
  const onlogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="navContainer">
      <Link to="/">
        <img
          className="navwebsitelogo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="navitemsContainer">
        <li className="navitem">
          <Link to="/" className="navlink">
            Home
          </Link>
        </li>
        <li className="navitem">
          <Link to="/jobs" className="navlink">
            Jobs
          </Link>
        </li>
      </ul>
      <button className="Logoutbutton" onClick={onlogout}>
        Logout
      </button>
      <ul className="iconscontainer">
        <li className="navitem">
          <Link to="/" className="navlink">
            <IoMdHome className="navicon" />
          </Link>
        </li>
        <li className="navitem">
          <Link to="/jobs" className="navlink">
            <BsFillBriefcaseFill className="navicon" />
          </Link>
        </li>
        <li className="navitem">
          <FiLogOut className="navicon" onClick={onlogout} />
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
