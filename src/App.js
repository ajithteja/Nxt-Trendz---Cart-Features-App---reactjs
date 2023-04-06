import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  decrementCartItemQuantity = (id, quantity) => {
    if (quantity > 0) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id !== id) {
            return eachItem
          }
          return {...eachItem, quantity: eachItem.quantity - 1}
        }),
      }))
    }
    if (quantity === 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(eachItem => eachItem.id !== id),
      }))
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newDecrementCart = cartList.map(eachItem => {
      if (eachItem.id !== id) {
        return eachItem
      }
      return {...eachItem, quantity: eachItem.quantity + 1}
    })

    this.setState({
      cartList: newDecrementCart,
    })
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachItem => eachItem.id !== id),
    }))
  }

  addCartItem = product => {
    const {cartList} = this.state

    const isProductExist = cartList.find(eachItem => eachItem.id === product.id)

    if (isProductExist === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const newArr = cartList.map(eachItem => {
        if (eachItem.id === product.id) {
          return {
            ...eachItem,
            quantity: eachItem.quantity + product.quantity,
          }
        }
        return eachItem
      })

      this.setState({
        cartList: newArr,
      })
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
