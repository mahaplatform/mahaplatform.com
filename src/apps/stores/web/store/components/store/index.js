import RouterStack from '../stack/router'
import Categories from '../categories'
import PropTypes from 'prop-types'
import CartIcon from '../carticon'
import Catalog from '../catalog'
import Product from '../product'
import React from 'react'

class Store extends React.Component {

  static propTypes = {
    products: PropTypes.array,
    store: PropTypes.object,
    children: PropTypes.any
  }

  store = null

  state = {
    filters: {},
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
            <Categories { ...this._getCategories() } />
          </div>
          <div className="store-main-body">
            <RouterStack { ...this._getStack() } />
          </div>
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
  }

  _getCartIcon() {
    return {
      cart: this.store.cart
    }
  }

  _getCatalog() {
    const { filters } = this.state
    const { store } = this.props
    return {
      filters,
      store
    }
  }

  _getCategories() {
    const { store } = this.props
    return {
      store
    }
  }

  _getProduct(params) {
    const { store } = this.props
    return {
      product: store.products.find(product => {
        return product.slug === params.slug
      }),
      Store: this.store
    }
  }

  _getStack() {
    const { store } = this.props
    return {
      prefix: `/stores/stores/${store.code}`,
      routes: [
        { path: '/', component: Catalog, props: this._getCatalog.bind(this) },
        { path: '/categories/:slug', component: Catalog, props: this._getCatalog.bind(this) },
        { path: '/products/:slug', component: Product, props: this._getProduct.bind(this) }
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
