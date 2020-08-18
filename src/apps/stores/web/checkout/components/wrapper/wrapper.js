import { Container, Loader } from 'maha-client'
import PropTypes from 'prop-types'
import Checkout from '../checkout'
import React from 'react'

const mapCheckoutResources = (props, context) => ({
  cart: `/api/stores/stores/${props.Store.code}/carts/${props.code}`
})

const WrappedCheckout = Container(mapCheckoutResources)(Checkout)

class Wrapper extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    products: PropTypes.array,
    Store: PropTypes.object,
    token: PropTypes.string,
    onGetCart: PropTypes.func,
    onSetCart: PropTypes.func
  }

  render() {
    const { code } = this.props
    if(code === null) return <Loader />
    return <WrappedCheckout { ...this._getCheckout()} />
  }

  componentDidMount() {
    this.props.onGetCart()
  }

  componentDidUpdate(prevProps) {
    const { code } = this.props
    if(code !== prevProps.code) {
      this.props.onSetCart(code)
    }
  }

  _getCheckout() {
    const { code, products, token, Store } = this.props
    return {
      code,
      products,
      token,
      Store
    }
  }

}

const mapResources = (props, context) => ({
  products: `/api/stores/stores/${props.Store.code}/products`
})

export default Container(mapResources)(Wrapper)
