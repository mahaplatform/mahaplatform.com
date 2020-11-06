import PropTypes from 'prop-types'
import { Image } from '@admin'
import React from 'react'

const VariantToken = ({ product, variant }) => (
  <div className="variant-token">
    <div className="variant-token-photo">
      { variant.photos.length > 0 ?
        <Image src={ variant.photos[0].asset.path } transforms={{ fit: 'cover', width: 24, height: 24 }} /> :
        <div className="variant-token-icon">
          <i className="fa fa-shopping-bag" />
        </div>
      }
    </div>
    <div className="variant-token-label">
      { product.title } { variant.options.map(option => {
        return `${option.option}: ${option.value}`
      }).join(', ') }
    </div>
  </div>
)

VariantToken.propTypes = {
  product: PropTypes.object,
  variant: PropTypes.object
}

export default VariantToken
