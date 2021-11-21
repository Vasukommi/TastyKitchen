import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {FaSearch} from 'react-icons/fa'
import {BsFillCartFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderMobileBottomMenuBar = () => (
    <nav className="mobile-bottom-navbar">
      <Link to="/" className="nav-link">
        <button type="button" className="mobile-nav-button">
          <AiFillHome />
          <p className="mobile-nav-title active-mobile-nav">Home</p>
        </button>
      </Link>
      <Link to="/find-food" className="nav-link">
        <button type="button" className="mobile-nav-button">
          <FaSearch />
          <p className="mobile-nav-title">Find Food</p>
        </button>
      </Link>
      <Link to="/cart" className="nav-link">
        <button type="button" className="mobile-nav-button">
          <BsFillCartFill />
          <p className="mobile-nav-title">Cart</p>
        </button>
      </Link>
    </nav>
  )

  return (
    <>
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-mobile-logo-container">
            <Link to="/" className="nav-link">
              <div className="header-logo-container">
                <img
                  src="https://res.cloudinary.com/dw1fcsurf/image/upload/v1635493897/Tasty%20Kitchen/Navigation/Frame_274_jy40cc.png"
                  alt="website logo"
                  className="website-logo-mobile"
                />
                <p className="logo-name">Tasty Kitchens</p>
              </div>
            </Link>
            <button
              type="button"
              className="logout-desktop-btn-mobile"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>

          <div className="nav-bar-large-container">
            <Link to="/" className="nav-link">
              <div className="header-logo-container">
                <img
                  className="website-logo"
                  src="https://res.cloudinary.com/dw1fcsurf/image/upload/v1635493897/Tasty%20Kitchen/Navigation/Frame_274_jy40cc.png"
                  alt="website logo"
                />
                <p className="logo-name">Tasty Kitchens</p>
              </div>
            </Link>
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-menu-item">
                <Link to="/find-food" className="nav-link">
                  Find Food
                </Link>
              </li>

              <li className="nav-menu-item">
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      {renderMobileBottomMenuBar()}
    </>
  )
}

export default withRouter(Header)
