import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Catalog extends React.Component {

  static propTypes = {
    product: PropTypes.object
  }

  render() {
    const { product } = this.props
    const inventory = this._getInventory()
    return (
      <div className={ this._getClass() }>
        <img src={ product.variants[0].media[0].path } />
        <h3>{ product.title }</h3>
        { inventory > 0 ?
          <p>{ inventory } in stock</p> :
          <p className="outofstock">sold out</p>
        }
        <p>{ numeral(product.variants[0].fixed_price).format('$0.00') }</p>
      </div>
    )
  }

  _getClass() {
    const inventory = this._getInventory()
    const classes = ['store-catalog-item']
    if(inventory === 0) classes.push('outofstock')
    return classes.join(' ')
  }

  _getInventory() {
    const { product } = this.props
    return product.variants.reduce((inventory, variant) => {
      return inventory + variant.inventory_quantity
    }, 0)
  }

}

export default Catalog
