import { RouterStack } from '@client'
import PropTypes from 'prop-types'
import CartIcon from '../carticon'
import Catalog from '../catalog'
import Product from '../product'
import React from 'react'

class Store extends React.Component {

  static contextTypes = {
    analytics: PropTypes.object
  }

  static propTypes = {
    products: PropTypes.array,
    store: PropTypes.object,
    children: PropTypes.any
  }

  store = null

  state = {
    ready: false
  }

  _handleReady = this._handleReady.bind(this)

  render() {
    if(!this.state.ready) return null
    return (
      <div className="store">
        <Catalog {...this._getCatalog() } />
        <RouterStack { ...this._getStack() } />
        <div className="store-cart-icon">
          <CartIcon { ...this._getCartIcon() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { store } = this.props
    this.store = new window.Maha.Stores.Store({
      code: store.code
    })
    this.store.on('ready', this._handleReady)
    this.store.init()
    this.context.analytics.trackPageView()
    this.context.analytics.trackMaha('store_id', store.id)
  }

  _getCartIcon() {
    return {
      cart: this.store.cart
    }
  }

  _getCatalog() {
    const { store } = this.props
    return {
      store
    }
  }

  _getProduct(params) {
    const { store } = this.props
    return {
      store_code: store.code,
      code: params.code,
      Store: this.store
    }
  }

  _getStack() {
    const { store } = this.props
    return {
      prefix: store.path,
      rootPath: store.path,
      routes: [
        { path: '/products/:code', component: Product, props: this._getProduct.bind(this) }
      ]
    }
  }

  _handleReady() {
    this.setState({
      ready: true
    })
  }

}

export default Store
