import { Container, Loader } from '@client'
import PropTypes from 'prop-types'
import Cart from '../cart'
import React from 'react'

class Wrapper extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    products: PropTypes.array,
    Store: PropTypes.object,
    onGetCart: PropTypes.func,
    onSetCart: PropTypes.func
  }

  render() {
    const { code } = this.props
    if(code === null) return <Loader />
    return <Cart { ...this._getCart()} />
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

  _getCart() {
    const { code, products, Store } = this.props
    return {
      code,
      products,
      Store
    }
  }

}

const mapResources = (props, context) => ({
  products: `/api/stores/stores/${props.Store.code}/products`
})

export default Container(mapResources)(Wrapper)
