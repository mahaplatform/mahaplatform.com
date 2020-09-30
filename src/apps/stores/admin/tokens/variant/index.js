import PropTypes from 'prop-types'
import { Image } from 'maha-admin'
import React from 'react'

const VariantToken = ({ variant }) => (
  <div className="variant-token">
    <div className="variant-token-photo">
      { variant.photos.length > 0 ?
        <Image src={ variant.photos[0].path } transforms={{ fit: 'cover', width: 32, height: 32 }} /> :
        <div className="variant-token-icon">
          <i className="fa fa-shopping-bag" />
        </div>
      }
    </div>
    <div className="variant-token-label">
      { variant.title }
    </div>
  </div>
)

VariantToken.propTypes = {
  variant: PropTypes.object
}

export default VariantToken
