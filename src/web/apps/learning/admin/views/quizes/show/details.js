import QuizKey from '../../../components/quizkey'
import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Details = ({ quiz }) => {

  const items = [
    { label: 'Title ', content: quiz.title },
    { component: <QuizKey quiz={ quiz } /> }
  ]

  return <List items={ items } />

}

Details.propTypes = {
  quiz: PropTypes.object
}

export default Details
