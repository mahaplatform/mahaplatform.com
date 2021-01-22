import { Button, Carousel, Container, DropDown, Image, ModalPanel } from '@client'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import Quantity from '../quantity'
import numeral from 'numeral'
import React from 'react'

class Product extends React.Component {

  static contextTypes = {
    analytics: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    product: PropTypes.object,
    Store: PropTypes.object
  }

  state = {
    index: 0,
    quantity: 1
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleBack = this._handleBack.bind(this)
  _handleOptions = this._handleOptions.bind(this)
  _handleQuantity = this._handleQuantity.bind(this)

  render() {
    const { product } = this.props
    const variant = this._getVariant()
    return (
      <ModalPanel { ...this._getPanel() }>
        <Helmet>
          <title>{ product.title }</title>
        </Helmet>
        <div className="store-product-container">
          <div className="store-product">
            <div className="store-product-media">
              <div className="store-product-media-inner">
                { variant.inventory_policy === 'deny' && variant.inventory_onhand <= 0 &&
                  <div className="store-product-soldout">
                    SOLD OUT
                  </div>
                }
                { variant.photos.length > 0 ?
                  <Carousel { ...this._getCarousel() } /> :
                  <div className="store-product-icon">
                    <i className="fa fa-shopping-bag" />
                  </div>
                }
              </div>
            </div>
            <div className="store-product-details">
              <div className="store-product-title">
                { product.title }
              </div>
              <div className="store-product-categories">
                CATEGORIES: { product.categories.map(category => category.title).join(', ') }
              </div>
              <div className="store-product-description" dangerouslySetInnerHTML={{ __html: product.description }} />
              { product.variants.length > 1 &&
                <div className="store-product-variants">
                  <DropDown { ...this._getDropDown() } />
                </div>
              }
              { variant.inventory_policy === 'deny' &&
                <div className="store-product-instock">
                  { variant.inventory_onhand <= 0 ?
                    <span>OUT OF STOCK</span> :
                    <span>{ variant.inventory_onhand } IN STOCK</span>
                  }
                </div>
              }
              { (variant.inventory_policy !== 'deny' || variant.inventory_onhand > 0) &&
                <Quantity { ...this._getQuantity(variant) } />
              }
              { (variant.inventory_policy !== 'deny' || variant.inventory_onhand > 0) &&
                <Button { ...this._getAdd(variant) } />
              }
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this.context.analytics.trackPageView()
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

  _getCategory() {
    const { product } = this.props
    return {
      label: product.category.title,
      className: 'link',
      handler: () => {}
    }
  }

  _getDropDown() {
    const { product } = this.props
    return {
      options: product.variants.map((variant, index) => ({
        value: index,
        text: variant.options.map(option => {
          return `${option.option}: ${option.value}`
        }).join(', ') + ` (${this._getPrice(variant)})`
      })),
      defaultValue: 0,
      onChange: this._handleOptions
    }
  }

  _getPanel() {
    const { product } = this.props
    return {
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      title: product.title,
      color: 'green'
    }
  }

  _getQuantity(variant) {
    return {
      variant,
      onChange: this._handleQuantity
    }
  }

  _getStore() {
    return {
      label: 'Home',
      className: 'link',
      handler: () => {}
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
    const { product } = this.props
    const { quantity } = this.state
    const categories = product.categories.map(category => category.title).join(',')
    this.props.Store.cart.addItem(variant.code, quantity)
  }

  _handleBack() {
    this.context.router.history.goBack()
  }

  _handleOptions(index) {
    this.setState({ index })
  }

  _handleQuantity(quantity) {
    this.setState({ quantity })
  }

}

const mapResources = (props, context) => ({
  product: `/api/stores/stores/${props.store_code}/products/${props.code}`
})

export default Container(mapResources)(Product)
