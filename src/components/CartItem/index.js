import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import './index.css'

class CartItem extends Component {
  state = {}

  componentDidMount() {
    const {eachItem} = this.props
    const {cost, quantity} = eachItem
    const totalItemCost = cost * quantity
    this.setState({totalItemCost, quantity})
  }

  onDecrementClicked = () => {
    const {onChangeTotalAmount, eachItem, onDeleteCartItem} = this.props
    const {cost, id} = eachItem
    const {quantity} = this.state
    if (quantity > 1) {
      onChangeTotalAmount(-1 * cost)
      this.setState(prev => ({
        quantity: prev.quantity - 1,
        totalItemCost: prev.totalItemCost - cost,
      }))
    } else {
      onDeleteCartItem(id)
      onChangeTotalAmount(-1 * cost)
      localStorage.removeItem(`quantity${id}`)
      localStorage.removeItem(`isButtonClicked${id}`)
    }
  }

  onIncrementClicked = () => {
    const {onChangeTotalAmount, eachItem} = this.props
    const {cost} = eachItem
    onChangeTotalAmount(cost)
    this.setState(prev => ({
      quantity: prev.quantity + 1,
      totalItemCost: prev.totalItemCost + cost,
    }))
  }

  render() {
    const {eachItem} = this.props
    const {imageUrl, name} = eachItem
    const {totalItemCost, quantity} = this.state
    return (
      <>
        <li testid="cartItem" className="mobile-list-cart-item">
          <img
            className="mobile-cart-item-image"
            src={imageUrl}
            alt={imageUrl}
          />
          <div>
            <h1 className="cart-Item-name">{name}</h1>
            <div className="cartItem-quantity-container">
              <button
                testid="decrement-quantity"
                type="button"
                className="decrement-button"
                onClick={this.onDecrementClicked}
              >
                <BsDashSquare />
              </button>
              <span testid="item-quantity" className="cart-item-quantity">
                {quantity}
              </span>
              <button
                testid="increment-quantity"
                type="button"
                className="increment-button"
                onClick={this.onIncrementClicked}
              >
                <BsPlusSquare />
              </button>
            </div>
            <p testid="total-price" className="cart-item-cost">
              <span>₹ </span>
              {totalItemCost}
            </p>
          </div>
        </li>
        <li testid="cartItem" className="desktop-list-cart-item">
          <div className="desktop-item-container">
            <img
              className="desktop-cart-item-image"
              src={imageUrl}
              alt={imageUrl}
            />
            <h1 className="desktop-cart-item-name">{name}</h1>
          </div>
          <div className="desktop-cartItem-quantity-container">
            <button
              testid="decrement-quantity"
              type="button"
              className="decrement-button"
              onClick={this.onDecrementClicked}
            >
              <BsDashSquare />
            </button>
            <span testid="item-quantity" className="desktop-cart-item-quantity">
              {quantity}
            </span>
            <button
              testid="increment-quantity"
              type="button"
              className="increment-button"
              onClick={this.onIncrementClicked}
            >
              <BsPlusSquare />
            </button>
          </div>
          <p testid="total-price" className="desktop-cart-item-cost">
            <span>₹ </span>
            {totalItemCost}
          </p>
        </li>
      </>
    )
  }
}

export default CartItem
