import Review from '../../../components/review'
import Materials from './materials'
import Complete from '../complete'
import { Page } from 'maha-admin'
import Lessons from './lessons'
import Details from './details'
import Quizes from './quizes'
import React from 'react'

const getTabs = (user, { fulfillment, lessons, materials, quizes }) => {

  const items = [
    { label: 'Details', component: <Details user={ user } fulfillment={ fulfillment } /> }
  ]

  if(fulfillment.training.type === 'local') {
    items.push({ label: 'Materials', component: <Materials materials={ materials } /> })
    items.push({ label: 'Quizes', component: <Quizes quizes={ quizes } /> })
  }

  if(fulfillment.training.type === 'maha') {
    items.push({ label: 'Lessons', component: <Lessons lessons={ lessons } /> })
  }

  return { items }

}

const getButtons = (user, { fulfillment }) => {

  const review = {
    endpoint: `/api/admin/training/fulfillments/${fulfillment.id}/review`,
    questions: [
      {
        name: 'overall_rating',
        question: 'How would you rate the overall quality of the presentation?',
        type: 'select',
        answers: [
          { value: 5, text: 'Excellent' },
          { value: 4, text: 'Good' },
          { value: 3, text: 'Average' },
          { value: 2, text: 'Poor' },
          { value: 1, text: 'Terrible' }
        ]
      }, {
        name: 'expectations_rating',
        question: 'How well did the training meet your expectations?',
        type: 'select',
        answers: [
          { value: 5, text: 'Extremely well' },
          { value: 4, text: 'Very well' },
          { value: 3, text: 'Moderately well' },
          { value: 2, text: 'Slightly well' },
          { value: 1, text: 'Not well at all' }
        ]
      }, {
        name: 'knowledge_rating',
        question: 'How do you rate the presenter\'s knowledge of the subject matter?',
        type: 'select',
        answers: [
          { value: 3, text: 'High' },
          { value: 2, text: 'Average' },
          { value: 1, text: 'Low' }
        ]
      }, {
        name: 'presentation_rating',
        question: 'How well did the presenter keep the presentation alive and interesting?',
        type: 'select',
        answers: [
          { value: 5, text: 'Extremely well' },
          { value: 4, text: 'Very well' },
          { value: 3, text: 'Moderately well' },
          { value: 2, text: 'Slightly well' },
          { value: 1, text: 'Not well at all' }
        ]
      }, {
        name: 'content_rating',
        question: 'Would you attend an additional training in the same / similar subject matter if given the opportunity?',
        type: 'select',
        answers: [
          { value: 4, text: 'Yes, definitely' },
          { value: 3, text: 'Probably, depending on circumstances / topic' },
          { value: 2, text: 'Probably not' },
          { value: 1, text: 'Definitely not' }
        ]
      }, {
        name: 'additional_feedback',
        question: 'Please list any additional feedback you would like to provide, including suggested future staff training opportunities.',
        type: 'textarea'
      }
    ]
  }

  if(user.id === fulfillment.user.id && !fulfillment.completed_at) {
    return [
      { label: 'Complete Training', color: 'green', modal: <Complete fulfillment={ fulfillment } /> },
      { label: 'Review Training', color: 'green', modal: <Review { ...review } /> }
    ]
  }

  return null

}

const mapResourcesToPage = (props, context) => ({
  fulfillment: `/api/admin/training/fulfillments/${props.params.id}`,
  materials: `/api/admin/training/fulfillments/${props.params.id}/materials`,
  lessons: `/api/admin/training/fulfillments/${props.params.id}/lessons`,
  quizes: `/api/admin/training/fulfillments/${props.params.id}/quizes`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Training',
  tabs: getTabs(props.user, resources),
  buttons: getButtons(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
