import { Infinite, ModalPanel } from '@client'
import Categories from '../categories'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Catalog extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    categories: PropTypes.array,
    store: PropTypes.object
  }

  state = {
    category_id: 0
  }

  _handleCategory = this._handleCategory.bind(this)

  render() {
    const { store } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="store-catalog">
          { store.categories.length > 0 &&
            <div className="store-catalog-header">
              <Categories { ...this._getCategories() } />
            </div>
          }
          <div className="store-catalog-body">
            <Infinite { ...this._getInfinite() } />
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

  _getFilter() {
    const { category_id } = this.state
    if(category_id === 0) return null
    return {
      category_id: {
        $eq: category_id
      }
    }
  }

  _getInfinite() {
    const { store } = this.props
    return {
      endpoint: `/api/stores/stores/${store.code}/products`,
      filter: this._getFilter(),
      layout: Results,
      props: {
        store
      }
    }
  }

  _getPanel() {
    const { store } = this.props
    return {
      title: store.title,
      color: 'green'
    }
  }

  _handleCategory(category_id) {
    this.setState({ category_id })
  }

}

export default Catalog
