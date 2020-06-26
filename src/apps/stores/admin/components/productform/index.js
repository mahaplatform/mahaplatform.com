import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Variants from './variants'
import Product from './product'
import React from 'react'

class ProductForm extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object
  }

  static defaultProps = {
  }

  state = {
    product: {},
    cards: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleProduct = this._handleProduct.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleVariants = this._handleVariants.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Product, this._getProduct())
  }

  _getProduct() {
    return {
      onCancel: this._handleCancel,
      onDone: this._handleProduct
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getVariants(product) {
    return {
      product,
      onBack: this._handlePop,
      onDone: this._handleVariants
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
  }

  _handleProduct(product) {
    this.setState({ product })
    this._handlePush(Variants, this._getVariants(product))
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

  _handleVariants(variants) {
    console.log(variants)
  }

}

export default ProductForm
