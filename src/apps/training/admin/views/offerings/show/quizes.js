import PropTypes from 'prop-types'
import { List } from '@admin'
import React from 'react'

const Quizes = ({ offering, quizes }) => {

  const list = {
    items: quizes.map(quiz => ({
      link: `/admin/training/offerings/${offering.id}/quizes/${quiz.id}`,
      content: quiz,
      component: (
        <div className="token">
          <strong>{ quiz.title }</strong><br />
          10 administrations
        </div>
      )
    })),
    empty: {
      icon: 'question',
      title: 'No quizes',
      text: 'There are no quizes for this offering'
    }
  }

  return <List { ...list } />

}

Quizes.propTypes = {
  offering: PropTypes.object,
  quizes: PropTypes.array
}

export default Quizes
