import { Button } from 'maha-client'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Product extends React.Component {

  static propTypes = {
    product: PropTypes.object
  }

  _handleAdd = this._handleAdd.bind(this)

  render() {
    const { product } = this.props
    return (
      <div className="store-catalog-item">
        <img src={ product.media[0].path } />
        <h3>{ product.title }</h3>
        <p>{ numeral(product.fixed_price).format('0.00') }</p>
        <Button { ...this._getAdd() } />
      </div>
    )
  }

  _getAdd() {
    return {
      label: 'Add to Cart',
      color: 'black',
      handler: this._handleAdd
    }
  }

  _handleAdd() {}

}

export default Product
