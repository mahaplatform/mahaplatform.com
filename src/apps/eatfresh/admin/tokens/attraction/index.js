import { Image } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const AttractionToken = ({ title, photo, address_1 }) => (
  <div className="eatfresh-attraction-token">
    <div className="eatfresh-attraction-token-photo">
      <Image src={ photo } title={ title } transforms={{ fit: 'cover', w: 32, h: 32 }} />
    </div>
    <div className="eatfresh-attraction-token-title">
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
