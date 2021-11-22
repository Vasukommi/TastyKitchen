import {Component} from 'react'
import {Link} from 'react-router-dom'

import CartItem from '../CartItem'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class Cart extends Component {
  state = {cartData: [], orderStatus: false}

  componentDidMount() {
    const cartData = localStorage.getItem('cartData')
    const parseCartData = JSON.parse(cartData)
    if (parseCartData === null || parseCartData.length === 0) {
      this.setState({cartStatus: false})
    } else {
      const cartAmounts = []

      if (parseCartData.length > 0) {
        parseCartData.forEach(eachItem => {
          const totalItemAmount = eachItem.cost * eachItem.quantity
          cartAmounts.push(totalItemAmount)
        })
        const totalCartAmount = cartAmounts.reduce(
          (previousScore, currentScore) => previousScore + currentScore,
        )
        this.setState({totalCartAmount})
      }
      this.setState({cartData: parseCartData, cartStatus: true})
    }
  }

  onClickPlaceOrder = () => {
    const {cartData} = this.state
    cartData.forEach(eachItem => {
      const {id} = eachItem
      localStorage.removeItem(`quantity${id}`)
      localStorage.removeItem(`isButtonClicked${id}`)
    })
    localStorage.removeItem('cartData')
    this.setState({orderStatus: true, cartData: []})
  }

  onChangeTotalAmount = value => {
    this.setState(prev => ({totalCartAmount: prev.totalCartAmount + value}))
  }

  updateCartData = () => {
    const {cartData} = this.state
    if (cartData.length > 0) {
      localStorage.setItem('cartData', cartData)
    } else {
      localStorage.removeItem('cartData')
    }
  }

  onDeleteCartItem = id => {
    const {cartData} = this.state
    const updatedCartData = cartData.filter(eachItem => eachItem.id !== id)
    this.setState({cartData: updatedCartData}, this.updateCartData)
  }

  render() {
    const {cartData, cartStatus, orderStatus, totalCartAmount} = this.state

    return (
      <>
        {cartStatus && totalCartAmount > 0 ? (
          <>
            {!orderStatus ? (
              <div>
                <Header />
                <div className="cart-container">
                  <div className="cart-responsive-container">
                    <ul className="cart-list-container">
                      <li className="cart-desktop-list-header">
                        <p className="list-header-name">Item</p>
                        <p className="list-header-name">Quantity</p>
                        <p className="list-header-name">Price</p>
                      </li>
                      {cartData.map(eachItem => (
                        <CartItem
                          eachItem={eachItem}
                          key={eachItem.id}
                          onChangeTotalAmount={this.onChangeTotalAmount}
                          onDeleteCartItem={this.onDeleteCartItem}
                        />
                      ))}
                    </ul>
                    <hr className="cart-line" />
                    <div>
                      <div className="total-cart-amount-container">
                        <p className="total-order-text">Order Total:</p>
                        <p testid="total-price" className="total-order-amount">
                          ₹{totalCartAmount}
                        </p>
                      </div>
                    </div>
                    <div className="place-order-button-container">
                      <button
                        type="button"
                        className="cart-place-order-button"
                        onClick={this.onClickPlaceOrder}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            ) : (
              <>
                <Header />
                <div className="order-successful-container">
                  <div className="order-successful-responsive-container">
                    <img
                      className="order-successful-image"
                      src="https://res.cloudinary.com/dw1fcsurf/image/upload/v1636537713/Tasty%20Kitchen/PageNotFound/check-circle.1_1_wss230.png"
                      alt="order successful"
                    />
                    <h1 className="order-successful-heading">
                      Payment Successful
                    </h1>
                    <p className="order-successful-para">
                      Thank you for ordering <br />
                      Your payment is successfully completed.
                    </p>
                    <Link to="/">
                      <button type="button" className="order-successful-button">
                        Go To Home Page
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div>
            <Header />
            <div className="empty-cart-container">
              <div className="empty-cart-responsive-container">
                <img
                  className="empty-cart-image"
                  src="https://res.cloudinary.com/dw1fcsurf/image/upload/v1635828875/Tasty%20Kitchen/Cart/cooking_1_nbxuds.png"
                  alt="empty cart"
                />
                <h1 className="empty-cart-heading">No Order Yet!</h1>
                <p className="empty-cart-para">
                  Your cart is empty. Add something from the menu.
                </p>
                <Link to="/">
                  <button className="empty-cart-button" type="button">
                    Order Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Cart
