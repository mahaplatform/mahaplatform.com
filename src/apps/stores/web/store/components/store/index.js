import { Container } from 'maha-client'
import PropTypes from 'prop-types'
import CartIcon from '../carticon'
import React from 'react'

import RouterStack from '../stack/router'

import Catalog from '../catalog'
import Product from '../product'


class Store extends React.Component {

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
        <div className="store-header">
          <div className="store-header-action"/>
          <div className="store-header-title">
            2020 Annual Bulb Sale
          </div>
          <div className="store-header-action">
            <CartIcon { ...this._getCartIcon() } />
          </div>
        </div>
        <div className="store-body">
          <Catalog { ...this._getCatalog() } />
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
      store: this.store
    }
  }

  _getStack() {
    return {
      routes: [
        { path: '/stores/stores/maha', component: Catalog },
        { path: '/stores/stores/maha/products/:id', component: Product }
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
