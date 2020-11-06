import PropTypes from 'prop-types'
import { Image } from '@admin'
import React from 'react'

const ProductToken = ({ product }) => (
  <div className="product-token">
    <div className="product-token-photo">
      { product.variants[0].photos.length > 0 ?
        <Image src={ product.variants[0].photos[0].asset.path } transforms={{ fit: 'cover', width: 24, height: 24 }} /> :
        <div className="product-token-icon">
          <i className="fa fa-shopping-bag" />
        </div>
      }
    </div>
    <div className="product-token-label">
      { product.title } { !product.is_active &&
        <span className="alert">INACTIVE</span>
      }
    </div>
  </div>
)

ProductToken.propTypes = {
  product: PropTypes.object
}

export default ProductToken
