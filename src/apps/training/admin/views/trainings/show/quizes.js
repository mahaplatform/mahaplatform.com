import QuizToken from '../../../tokens/quiz'
import New from '../../quizes/new'
import PropTypes from 'prop-types'
import { List } from '@admin'
import React from 'react'

const Quizes = ({ training, quizes }) => {

  const list = {
    items: quizes.map(quiz => ({
      link: `/admin/training/quizes/${quiz.id}`,
      content: quiz,
      component: QuizToken
    })),
    empty: {
      icon: 'question-circle',
      title: 'No quizes',
      text: 'There are no quizes for this training',
      button: {
        label: 'Create Quiz',
        modal: <New quizable_type="trainings" quizable_id={ training.id } />
      }
    },
    buttons: quizes.length > 0 ? [{
      label: 'Create Another Quiz',
      color: 'blue',
      modal: <New quizable_type="trainings" quizable_id={ training.id } />
    }] : null
  }

  return <List { ...list } />

}

Quizes.propTypes = {
  training: PropTypes.object,
  quizes: PropTypes.array
}

export default Quizes
