import PropTypes from 'prop-types'
import React from 'react'
import Item from './item'

class Results extends React.Component {

  static propTypes = {
    all: PropTypes.number,
    records: PropTypes.array,
    store: PropTypes.object,
    total: PropTypes.number
  }

  render() {
    const { records } = this.props
    return (
      <div className="store-catalog-results">
        { records.map((product, index) => (
          <Item { ...this._getItem(product) } key={`product_${product.id}`} />
        ))}
      </div>
    )
  }

  _getItem(product) {
    const { store } = this.props
    return {
      product,
      store
    }
  }


}

export default Results
