import FeedbackToken from './feedback'
import RatingToken from './rating'
import { List, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const ReviewsToken = ({ reviews }) => {
  const message = {
    icon: 'check',
    title: 'No reviews',
    text: 'No attendees have reiewed this offering'
  }
  const list = {
    items: [
      { component: <Message {...message}/> }
    ]
  }
  if(reviews.total === 0) return <List { ...list }/>
  return (
    <div className="review-token">
      <RatingToken { ...reviews.overall_rating } total={ reviews.total } />
      <RatingToken { ...reviews.expectations_rating } total={ reviews.total } />
      <RatingToken { ...reviews.knowledge_rating } total={ reviews.total } />
      <RatingToken { ...reviews.presentation_rating } total={ reviews.total } />
      <RatingToken { ...reviews.content_rating } total={ reviews.total } />
      <FeedbackToken { ...reviews.additional_feedback } />
    </div>
  )
}

ReviewsToken.propTypes = {
  reviews: PropTypes.object
}

export default ReviewsToken
