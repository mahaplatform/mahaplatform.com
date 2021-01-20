import VariantToken from '@apps/stores/admin/tokens/variant'
import PropTypes from 'prop-types'
import React from 'react'

class Products extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    items: PropTypes.array,
    products: PropTypes.array
  }

  render() {
    const { items } = this.props
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Product</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            { items.map((item, index) => {
              const variant = this._getVariant(item.code)
              return (
                <tr key={`item_${index}`}>
                  <td className="unpadded">
                    <VariantToken product={ variant.product } variant={ variant }/>
                  </td>
                  <td>{ item.quantity }</td>
                  <td>{ item.price }</td>
                </tr>
              )
            }) }
            { items.length === 0 &&
              <tr>
                <td colSpan="3" className="center">
                  This cart doesnt have any items
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    )
  }

  _getVariants() {
    const { products } = this.props
    return products.reduce((products, product) => [
      ...products,
      ...product.variants.reduce((variants, variant) => [
        ...variants,
        {
          title: product.title,
          description: product.description,
          thumbnail: variant.photos[0] ? variant.photos[0].asset : null,
          product,
          ...variant
        }
      ], [])
    ], [])
  }

  _getVariant(code) {
    const variants = this._getVariants()
    return variants.find(variant => variant.code === code)
  }

}

export default Products
