import { Image } from 'maha-client'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Catalog extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    product: PropTypes.object,
    store: PropTypes.object
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { product } = this.props
    const inventory = this._getInventory()
    return (
      <div className={ this._getClass() } onClick={ this._handleClick }>
        { product.variants[0].photos.length > 0 &&
          <Image { ...this._getThumbnail(product) } />
        }
        <h3>{ product.title }</h3>
        { inventory > 0 ?
          <p>{ inventory } in stock</p> :
          <p className="outofstock">sold out</p>
        }
        <p>{ numeral(product.variants[0].fixed_price).format('$0.00') }</p>
      </div>
    )
  }

  _getThumbnail(product) {
    return {
      src: product.variants[0].photos[0] ? product.variants[0].photos[0].asset.path : null,
      transforms: { fit: 'cover', w: 250, h: 250 }
    }
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

  _handleClick() {
    const { product } = this.props
    this.context.router.history.push(`/stores/stores/maha/products/${product.code}`)
  }

}

export default Catalog
