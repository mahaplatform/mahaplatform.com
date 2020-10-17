import { Button, Carousel, Container, Image } from 'maha-client'
import PropTypes from 'prop-types'
import Quantity from '../quantity'
import Options from '../options'
import numeral from 'numeral'
import React from 'react'

class Product extends React.Component {

  static propTypes = {
    product: PropTypes.object,
    Store: PropTypes.object
  }

  state = {
    index: 0,
    quantity: 1
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleOptions = this._handleOptions.bind(this)
  _handleQuantity = this._handleQuantity.bind(this)

  render() {
    const { product } = this.props
    const variant = this._getVariant()
    return (
      <div className="store-product-container">
        <div className="store-product">
          <div className="store-product-photos">
            { variant.photos.length > 0 ?
              <Carousel { ...this._getCarousel() } /> :
              <div className="store-product-icon">
                <i className="fa fa-shopping-bag" />
              </div>
            }
          </div>
          <div className="store-product-details">
            <div className="store-product-title">
              { product.title }
            </div>
            <Options { ...this._getOptions() } />
            <div className="store-product-price">
              { this._getPrice(variant) }
            </div>
            <div className="store-product-description">
              { product.description }
            </div>
            <Quantity { ...this._getQuantity() } />
            <Button { ...this._getAdd(variant) } />
          </div>
        </div>
      </div>
    )
  }

  _getAdd(variant) {
    const { quantity } = this.state
    const price = variant.fixed_price
    return {
      label: `Add to Cart &bull; ${ numeral(price * quantity).format('$0.00') } (${quantity})`,
      color: 'black',
      handler: this._handleAdd.bind(this, variant)
    }
  }

  _getCarousel() {
    const { product } = this.props
    return {
      slides: product.variants[0].photos.map((photo, index) => {
        return <Image { ...this._getThumbnail(photo) } key={`photo_${index}`} />
      })
    }
  }

  _getOptions() {
    const { product } = this.props
    return {
      product,
      onChange: this._handleOptions
    }
  }

  _getPrice(variant) {
    if(variant.price_type === 'fixed') {
      return numeral(variant.fixed_price).format('$0.00')
    }
    return 'FOO'
  }

  _getQuantity() {
    return {
      onChange: this._handleQuantity
    }
  }

  _getSize() {
    return {
      options: ['small','medium','large']
    }
  }

  _getThumbnail(photo) {
    return {
      src: photo.asset.path,
      transforms: { fit: 'cover', w: 250, h: 250 }
    }
  }

  _getVariant() {
    const { product } = this.props
    const { index } = this.state
    return product.variants[index]
  }

  _handleAdd(variant) {
    this.props.Store.cart.addItem(variant.code)
  }

  _handleOptions(index) {
    this.setState({ index })
  }

  _handleQuantity(quantity) {
    this.setState({ quantity })
  }

}

const mapResources = (props, context) => ({
  product: `/api/stores/stores/${props.code}/products/${props.params.id}`
})

export default Container(mapResources)(Product)
