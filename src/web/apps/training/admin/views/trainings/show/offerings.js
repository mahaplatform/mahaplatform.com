import OfferingToken from '../../../tokens/offering_token'
import New from '../../offerings/new'
import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Offerings = ({ training, offerings }) => {

  const list = {
    items: offerings.map(offering => ({
      link: `/admin/training/trainings/${training.id}/offerings/${offering.id}`,
      content: offering,
      component: OfferingToken
    })),
    empty: {
      icon: 'calendar',
      title: 'No offerings',
      text: 'There are no offerings for this training',
      button: {
        label: 'Create Offering',
        modal: <New training={ training } />
      }
    },
    buttons: offerings.length > 0 ? [{
      label: 'Create Another Offering',
      color: 'blue',
      modal: <New training={ training } />
    }] : null
  }

  return <List { ...list } />

}

Offerings.propTypes = {
  offerings: PropTypes.array,
  training: PropTypes.object
}

export default Offerings
