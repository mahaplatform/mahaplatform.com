import { Image } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const AttractionToken = ({ title, photo, address_1 }) => (
  <div className="attraction-token">
    <div className="attraction-token-photo">
      <Image src={ photo } title={ title } transforms={{ fit: 'cover', w: 32, h: 32 }} />
    </div>
    <div className="attraction-token-title">
      { title }
    </div>
  </div>
)

AttractionToken.propTypes = {
  address_1: PropTypes.string,
  photo: PropTypes.string,
  title: PropTypes.string
}
export default AttractionToken
