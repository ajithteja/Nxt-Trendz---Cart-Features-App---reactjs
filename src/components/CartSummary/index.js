import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const priceList = []
      cartList.map(eachItem =>
        priceList.push(eachItem.price * eachItem.quantity),
      )

      const price = priceList.reduce(
        (accumulator, current) => accumulator + current,
      )

      return (
        <div className="summary-container">
          <h1 className="order-total">
            Order Total: <span className="rupee">Rs {price}/-</span>
          </h1>
          <p className="items-cart">{cartList.length} items in cart</p>
          <button className="checkout-button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
