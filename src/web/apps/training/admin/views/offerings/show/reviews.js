import ReviewsToken from '../../../tokens/reviews_token'
import PropTypes from 'prop-types'
import React from 'react'

const Reviews = ({ reviews }) => <ReviewsToken reviews={ reviews } />

Reviews.propTypes = {
  reviews: PropTypes.object
}

export default Reviews
