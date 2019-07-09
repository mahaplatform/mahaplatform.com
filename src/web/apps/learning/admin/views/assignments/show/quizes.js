import QuizToken from '../../../tokens/quiz_token'
import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Quizes = ({ training, quizes }) => {

  const list = {
    items: quizes.map(quiz => ({
      component: () => (
        <div className="administration-token">
          <div className="administration-token-quiz">
            <QuizToken { ...quiz } />
          </div>
          <div className="administration-token-action">
            <button className="ui small blue button">Take Quiz</button>
          </div>
        </div>
      )
    })),
    empty: {
      icon: 'question',
      title: 'No quizes',
      text: 'There are no quizes for this training'
    }
  }

  return <List { ...list } />

}

Quizes.propTypes = {
  training: PropTypes.object,
  quizes: PropTypes.array
}

export default Quizes
