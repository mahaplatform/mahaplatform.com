import MerchantToken from '../../../tokens/merchant'
import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import Merchant from './merchant'
import React from 'react'

const Merchants = ({ team, merchants }) => {

  const items = merchants.map(merchant => ({
    tasks: [
      { label: 'Edit Merchant Account', modal: <Merchant merchant={ merchant } team_id={ team.id } /> }
    ],
    component: <MerchantToken merchant={ merchant } />
  }))

  return <List items={ items } />

}

Merchants.propTypes = {
  merchants: PropTypes.array,
  team: PropTypes.object
}

export default Merchants
