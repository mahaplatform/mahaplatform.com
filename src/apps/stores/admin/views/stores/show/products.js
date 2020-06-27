import PropTypes from 'prop-types'
import pluralize from 'pluralize'
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
              <td className="collapsing">Inventory</td>
              <td />
            </tr>
          </thead>
          <tbody>
            { products.map((product, index) => (
              <tr key={`product_${index}`} onClick={ this._handleClick.bind(this, product) }>
                <td>{ product.title } { product.variants.length > 0 &&
                  <span>({pluralize('Variant', product.variants.length, true)})</span>
                }</td>
                <td className="right aligned">15/50</td>
                <td className="proceed">
                  <i className="fa fa-chevron-right" />
                </td>
              </tr>
            )) }
            { products.length === 0 &&
              <tr>
                <td colSpan="3" className="center">
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
    router.history.push(`/admin/stores/stores/${store.id}/products/${product.id}`)
  }

}

export default Products
