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
    const product = { id: 1, title: 'Tulip Couleur Cardinal', variants: [
      { fixed_price: 7.50, inventory_quantity: 0, media: [
        { path: 'https://cdn.shopify.com/s/files/1/1419/7120/products/sq2Tulip_Coleur_Cardinal.SHUT_1024x.jpg?v=1571439571' }
      ] }
    ] }
    return (
      <div className="store-catalog-item">
        <img src={ product.variants[0].media[0].path } />
        <h3>{ product.title }</h3>
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
