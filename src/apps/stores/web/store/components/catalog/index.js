import { ModalPanel } from 'maha-client'
import Categories from '../categories'
import PropTypes from 'prop-types'
import Item from './item'
import React from 'react'

class Catalog extends React.Component {

  static propTypes = {
    categories: PropTypes.array,
    store: PropTypes.object
  }

  state = {
    category_id: 0
  }

  _handleCategory = this._handleCategory.bind(this)

  render() {
    const products = this._getProducts()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="store-catalog">
          <div className="store-catalog-header">
            <Categories { ...this._getCategories() } />
          </div>
          <div className="store-catalog-body">
            { products.map((product, index) => (
              <Item { ...this._getItem(product) } key={`product_${product.id}`} />
            ))}
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getCategories() {
    const { store } = this.props
    return {
      store,
      onChange: this._handleCategory
    }
  }

  _getPanel() {
    const { store } = this.props
    return {
      title: store.title,
      color: 'green'
    }
  }

  _getProducts() {
    const { category_id } = this.state
    const { store } = this.props
    return store.products.filter(product => {
      return category_id === 0 || product.category.id === category_id
    })
  }

  _getItem(product) {
    const { store } = this.props
    return {
      product,
      store
    }
  }

  _handleCategory(category_id) {
    this.setState({ category_id })
  }

}

export default Catalog
