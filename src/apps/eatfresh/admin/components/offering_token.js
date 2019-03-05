import { Image } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const OfferingToken = ({ photo, title }) => (
  <div className="offering-token">
    <div className="offering-token-photo">
      <Image src={ photo } title={ title } transforms={{ fit: 'cover', w: 32, h: 32 }} />
    </div>
    <div className="offering-token-title">
      { title }
    </div>
  </div>
)

OfferingToken.propTypes = {
  photo: PropTypes.string,
  title: PropTypes.string  
}

export default OfferingToken
