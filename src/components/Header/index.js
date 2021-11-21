import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {AiOutlineMenu, AiFillCloseCircle} from 'react-icons/ai'

import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {isMobileMenuClicked: false}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickMenuBar = () => {
    this.setState(prev => ({isMobileMenuClicked: !prev.isMobileMenuClicked}))
  }

  onCloseClicked = () => {
    this.setState(prev => ({isMobileMenuClicked: !prev.isMobileMenuClicked}))
  }

  render() {
    const {isMobileMenuClicked} = this.state
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
                className="nav-mobile-btn"
                onClick={this.onClickMenuBar}
              >
                <AiOutlineMenu size={20} />
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
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
        {isMobileMenuClicked && (
          <div className="nav-mobile-only-menu">
            <div className="nav-menu-mobile">
              <div className="nav-menu-container">
                <ul className="nav-menu-list-mobile">
                  <li className="nav-menu-item-mobile">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>

                  <li className="nav-menu-item-mobile">
                    <Link to="/cart" className="nav-link">
                      Cart
                    </Link>
                  </li>
                </ul>
                <button
                  type="button"
                  className="logout-desktop-btn-mobile"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </div>
              <button
                className="close-button"
                type="button"
                onClick={this.onCloseClicked}
              >
                <AiFillCloseCircle size={20} />
              </button>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
