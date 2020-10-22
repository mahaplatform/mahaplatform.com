import { Image } from 'maha-client'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Item extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    product: PropTypes.object,
    store: PropTypes.object,
    Store: PropTypes.object
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    const { product } = this.props
    const inventory = this._getInventory()
    const variant = product.variants[0]
    return (
      <div className={ this._getClass() } onClick={ this._handleClick }>
        <div className="store-catalog-item-inner">
          { variant.photos.length > 0 ?
            <Image { ...this._getThumbnail(product) } /> :
            <div className="store-catalog-item-icon">
              <i className="fa fa-shopping-bag" />
            </div>
          }
          <div className="store-catalog-item-details">
            <h3>{ product.title }</h3>
            <p>{ numeral(variant.fixed_price).format('$0.00') }</p>
          </div>
        </div>
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
      return inventory + variant.inventory_onhand
    }, 0)
  }

  _handleClick() {
    const { store, product } = this.props
    this.context.router.history.push(`/stores/stores/${store.code}/products/${product.slug}`)
  }

}

export default Item
