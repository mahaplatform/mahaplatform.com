import CompetencyToken from '../../tokens/competency_token'
import AssignExpectations from './expectations'
import { List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import Edit from './edit'
import React from 'react'

const Expectations = ({ classification, expectations }) => {

  const list = {
    items: expectations.map(expectation => ({
      content: expectation,
      component: CompetencyToken
    })),
    empty: {
      icon: 'handshake-o',
      title: 'No expectations',
      text: 'There are no expectations for this classification',
      button: {
        label: 'Manage Expectations',
        modal: <AssignExpectations classification={ classification } expectations={ expectations } />
      }
    }
  }

  return <List { ...list } />

}

Expectations.propTypes = {
  classification: PropTypes.object,
  expectations: PropTypes.array
}

const mapResourcesToPage = (props, context) => ({
  classification: `/api/admin/competencies/classifications/${props.params.id}`,
  expectations: `/api/admin/competencies/classifications/${props.params.id}/expectations`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.classification.title,
  tabs: {
    items: [
      { label: 'Expectations', component: <Expectations classification={ resources.classification } expectations={ resources.expectations } /> }
    ]
  },
  tasks: {
    items: [
      { label: 'Edit Classification', modal: <Edit classification={ resources.classification } /> },
      { label: 'Manage Expectations', modal: <AssignExpectations classification={ resources.classification } expectations={ resources.expectations } /> }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
