import ProductToken from '../../../tokens/product'
import PropTypes from 'prop-types'
import React from 'react'

class Products extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    products: PropTypes.array,
    store: PropTypes.object
  }

  render() {
    const { products } = this.props
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td />
            </tr>
          </thead>
          <tbody>
            { products.sort((a,b) => a.title > b.title ? 1 : -1).map((product, index) => (
              <tr key={`product_${index}`} onClick={ this._handleClick.bind(this, product) }>
                <td className="unpadded">
                  <ProductToken product={ product } />
                </td>
                <td className="proceed">
                  <i className="fa fa-chevron-right" />
                </td>
              </tr>
            )) }
            { products.length === 0 &&
              <tr>
                <td colSpan="2" className="center">
                  This store doesnt yet have any products
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    )
  }

  _handleClick(product) {
    const { router } = this.context
    const { store } = this.props
    router.history.push(`/stores/stores/${store.id}/products/${product.id}`)
  }

}

export default Products
