import BankToken from '../../../tokens/bank'
import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import Bank from './bank'
import React from 'react'

const Banks = ({ team, banks }) => {

  const items = banks.map(bank => ({
    tasks: [
      { label: 'Edit Bank Account', modal: <Bank bank={ bank } team_id={ team.id } /> }
    ],
    component: <BankToken bank={ bank } />
  }))

  return <List items={ items } />

}

Banks.propTypes = {
  banks: PropTypes.array,
  team: PropTypes.object
}

export default Banks
