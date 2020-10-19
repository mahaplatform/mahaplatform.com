import PropTypes from 'prop-types'
import Item from './item'
import React from 'react'

class Catalog extends React.Component {

  static propTypes = {
    filters: PropTypes.object,
    categories: PropTypes.array,
    store: PropTypes.object
  }

  render() {
    const products = this._getProducts()
    return (
      <div className="store-catalog">
        <div className="store-catalog-items">
          { products.map((product, index) => (
            <Item { ...this._getItem(product) } key={`product_${product.id}`} />
          ))}
        </div>
      </div>
    )
  }

  _getProducts() {
    const { filters, store } = this.props
    const { category_id } = filters
    return store.products
    // return store.products.filter(product => {
    //   if(category_id !== undefined && product.category.id !== category_id) return false
    //   return true
    // })
  }

  _getItem(product) {
    const { store } = this.props
    return {
      product,
      store
    }
  }

}

export default Catalog
