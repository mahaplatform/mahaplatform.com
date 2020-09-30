import PropTypes from 'prop-types'
import { Image } from 'maha-admin'
import React from 'react'

const VariantToken = ({ product, variant }) => {
  const src = (variant.photos.length > 0) ? variant.photos[0].path : '/assets/19532/me.jpg'
  return (
    <div className="variant-token">
      <div className="variant-token-photo">
        <Image src={ src } transforms={{ fit: 'cover', width: 32, height: 32 }} />
      </div>
      <div className="variant-token-label">
        { product.title } ({ variant.title })
      </div>
    </div>

  )
}

VariantToken.propTypes = {
  product: PropTypes.object,
  variant: PropTypes.object
}

export default VariantToken
