import CompetencyToken from '../../../tokens/competency'
import AssignExpectations from '../expectations'
import { List } from '@admin'
import PropTypes from 'prop-types'
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

export default Expectations
