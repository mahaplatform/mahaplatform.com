import QuizToken from '../../../tokens/quiz_token'
import Quiz from '../../../components/quiz'
import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Quizes = ({ training, quizes }) => {

  const _getButton = (quiz) => ({
    label: 'Take Quiz',
    color: 'blue',
    modal: <Quiz id={ quiz.id } />
  })

  const list = {
    items: quizes.map(quiz => ({
      component: (
        <div className="administration-token">
          <div className="administration-token-quiz">
            <QuizToken { ...quiz } />
          </div>
          <div className="administration-token-action">
            <Button { ..._getButton(quiz) } />
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
