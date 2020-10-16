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
    quantity: 1,
    price: 15
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleQuantity = this._handleQuantity.bind(this)

  render() {
    const { product } = this.props
    return (
      <div className="store-product-container">
        <div className="store-product">
          <div className="store-product-photos">
            { product.variants[0].photos.length > 0 &&
              <Carousel { ...this._getCarousel() } />
            }
          </div>
          <div className="store-product-details">
            <div className="store-product-title">
              { product.title }
            </div>
            <div className="store-product-option">
              <Options { ...this._getColor() } />
            </div>
            <div className="store-product-option">
              <Options { ...this._getSize() } />
            </div>
            <div className="store-product-price">
              { numeral(15).format('$0.00') }
            </div>
            <div className="store-product-description">
              { product.description }
            </div>
            <Quantity { ...this._getQuantity() } />
            <Button { ...this._getAdd() } />
          </div>
        </div>
      </div>
    )
  }

  _getAdd() {
    const { quantity, price } = this.state
    return {
      label: `Add to Cart &bull; ${ numeral(price * quantity).format('$0.00') } (${quantity})`,
      color: 'black',
      handler: this._handleAdd
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

  _getColor() {
    return {
      options: ['red','blue','green']
    }
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

  _handleAdd() {
    const { product } = this.props
    this.props.Store.cart.addItem(product.variants[0].code)
  }

  _handleQuantity(quantity) {
    this.setState({ quantity })
  }

}

const mapResources = (props, context) => ({
  product: `/api/stores/stores/${props.code}/products/${props.params.id}`
})

export default Container(mapResources)(Product)
