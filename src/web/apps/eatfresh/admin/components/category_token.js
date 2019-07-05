import { Image } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const CategoryToken = ({ photo, title }) => (
  <div className="eatfresh-category-token">
    <div className="eatfresh-category-token-photo">
      <Image src={ photo } title={ title } transforms={{ fit: 'cover', w: 32, h: 32 }} />
    </div>
    <div className="eatfresh-category-token-title">
      { title }
    </div>
  </div>
)

CategoryToken.propTypes = {
  photo: PropTypes.string,
  title: PropTypes.string
}

export default CategoryToken
