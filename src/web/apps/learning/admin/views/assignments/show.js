import Registration from './registration'
import { AssetToken, List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import Complete from './complete'
import moment from 'moment'
import React from 'react'

const Details = ({ assignment }) => {

  const list = {}

  if(assignment.is_complete) {
    list.alert = { color: 'green', message: 'This training is completed' }
  }

  list.items = [
    { label: 'Training', content: assignment.training.title },
    { label: 'Assigned By', content: assignment.assigned_by.full_name },
    { label: 'Employee', content: assignment.employee.full_name }
  ]

  if(assignment.training.url) {
    list.items.push({ label: 'URL', content: <a href={ assignment.training.url } target="_blank">{ assignment.training.url }</a> })
  }
  if(assignment.training.location) {
    list.items.push({ label: 'Location', content: assignment.training.location })
  }
  if(assignment.training.contact) {
    list.items.push({ label: 'Contact', content: assignment.training.contact })
  }

  if(assignment.training.type === 'local') {
    if(assignment.offering) {
      list.items.push({
        label: 'Registration',
        content: (
          <div>
            { moment(assignment.offering.date).format('dddd, MMMM DD, YYYY') }<br />
            Time: { moment(`2019-01-01 ${assignment.offering.starts_at}`).format('hh:mm A') } - { moment(`2019-01-01 ${assignment.offering.ends_at}`).format('hh:mm A') }<br />
            Facilitator: {assignment.offering.facilitator }<br />
            Location: {assignment.offering.location }
          </div>
        )
      })
      list.buttons = [{
        label: 'Change Registration',
        color: 'green',
        modal: <Registration assignment={ assignment } />
      }]
    } else {
      list.items.push({
        label: 'Registration',
        content: (
          <span className="error">You have not yet registered to attend an offering of this training</span>
        )
      })
      list.buttons = [{
        label: 'Register for a training',
        color: 'green',
        modal: <Registration assignment={ assignment } />
      }]
    }
  }

  return <List { ...list } />

}

Details.propTypes = {
  assignment: PropTypes.object
}

const Materials = ({ materials }) => {

  const list = {
    items: materials.map(asset => ({
      content: asset,
      link: `/admin/assets/${asset.id}`,
      component: AssetToken
    })),
    empty: {
      icon: 'calendar',
      title: 'No offerings',
      text: 'There are no offerings for this training'
    }
  }

  return <List { ...list } />

}

Materials.propTypes = {
  materials: PropTypes.array
}

const Lessons = ({ lessons }) => {

  return <div>Lessons</div>

}

Lessons.propTypes = {
  assignment: PropTypes.object
}

const Quizes = ({ assignment }) => {

  return <div>Quizes</div>

}

Quizes.propTypes = {
  assignment: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  assignment: `/api/admin/learning/assignments/${props.params.id}`,
  materials: `/api/admin/learning/assignments/${props.params.id}/materials`,
  lessons: `/api/admin/learning/assignments/${props.params.id}/lessons`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Training',
  tabs: {
    items: [
      { label: 'Details', component: <Details assignment={ resources.assignment } /> },
      ...resources.assignment.training.type === 'local' ? [
        { label: 'Materials', component: <Materials materials={ resources.materials } /> },
        { label: 'Quizes', component: <Quizes assignment={ resources.assignment } /> }
      ] : [],
      ...resources.assignment.training.type === 'maha' ? [
        { label: 'Lessons', component: <Lessons lessons={ resources.lessons } /> }
      ] : []
    ]
  },
  buttons: [
    { label: 'Complete Training', color: 'green', modal: <Complete assignment={ resources.assignment } /> }
  ]
})

export default Page(mapResourcesToPage, mapPropsToPage)
