import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Lessons = ({ training, lessons }) => {

  const list = {
    items: lessons.map(lesson => ({
      content: lesson.title,
      link: `/admin/training/trainings/${training.id}/lessons/${lesson.id}`
    })),
    empty: {
      icon: 'calendar',
      title: 'No lessons',
      text: 'There are no lessons for this training'
    }
  }

  return <List { ...list } />

}

Lessons.propTypes = {
  training: PropTypes.object,
  lessons: PropTypes.array
}

export default  Lessons
