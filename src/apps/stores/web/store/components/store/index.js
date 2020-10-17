import RouterStack from '../stack/router'
import { Container } from 'maha-client'
import Categories from '../categories'
import PropTypes from 'prop-types'
import CartIcon from '../carticon'
import Catalog from '../catalog'
import Product from '../product'
import React from 'react'

class Store extends React.Component {

  static propTypes = {
    products: PropTypes.array,
    Store: PropTypes.object,
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
        <div className="store-header">
          <div className="store-header-action"/>
          <div className="store-header-title">
            2020 Annual Bulb Sale
          </div>
          <div className="store-header-action">
            <CartIcon { ...this._getCartIcon() } />
          </div>
        </div>
        <div className="store-main">
          <div className="store-main-header">
            <Categories />
          </div>
          <div className="store-main-body">
            <RouterStack { ...this._getStack() }  />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.store = new window.Maha.Stores.Store({
      code: 'maha'
    })
    this.store.on('ready', this._handleReady)
    this.store.init()
  }

  _getCartIcon() {
    return {
      cart: this.store.cart
    }
  }

  _getCatalog() {
    const { products } = this.props
    return {
      products,
      Store: this.store
    }
  }

  _getProduct() {
    const { Store } = this.props
    return {
      code: Store.code,
      Store: this.store
    }
  }

  _getStack() {
    return {
      prefix: '/stores/stores/maha',
      routes: [
        { path: '/', component: Catalog, props: this._getCatalog.bind(this) },
        { path: '/products/:id', component: Product, props: this._getProduct.bind(this) }
      ]
    }
  }

  _handleReady() {
    this.setState({
      ready: true
    })
  }

}

const mapResources = (props, context) => ({
  products: `/api/stores/stores/${props.Store.code}/products`
})

export default Container(mapResources)(Store)
