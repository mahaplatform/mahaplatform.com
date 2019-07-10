import { List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ lesson }) => {

  const list = {}

  list.items = [
    { label: 'Title', content: lesson.title }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  lesson: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  lesson: `/api/admin/trainings/trainings/${props.params.training_id}/lessons/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Lesson',
  tabs: {
    items: [
      { label: 'Details', component: <Details lesson={ resources.lesson } /> }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
