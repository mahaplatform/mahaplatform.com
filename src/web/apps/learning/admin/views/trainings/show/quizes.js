import QuizToken from '../../../tokens/quiz_token'
import New from '../../quizes/new'
import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Quizes = ({ training, quizes }) => {

  const list = {
    items: quizes.map(quiz => ({
      link: `/admin/learning/quizes/${quiz.id}`,
      content: quiz,
      component: QuizToken
    })),
    empty: {
      icon: 'question',
      title: 'No quizes',
      text: 'There are no quizes for this training',
      button: {
        label: 'Create Quiz',
        modal: <New quizable_type="trainings" quizable_id={ training.id } />
      }
    },
    buttons: [{
      label: 'Create Another Quiz',
      color: 'blue',
      modal: <New quizable_type="trainings" quizable_id={ training.id } />
    }]
  }

  return <List { ...list } />

}

Quizes.propTypes = {
  training: PropTypes.object,
  quizes: PropTypes.array
}

export default Quizes
