import CommitmentToken from '../../../tokens/commitment_token'
import SetCommitments from '../../../components/commitments'
import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Commitments = ({ user, plan, commitments } ) => {

  const list = {
    items: commitments.map(commitment => ({
      content: commitment,
      component: (commitment) => <CommitmentToken plan={ plan } commitment={ commitment } />
    })),
    empty: {
      icon: 'handshake-o',
      title: 'No commitments',
      text: 'There are no commitments for this plan',
      button: {
        label: 'Make Commitments',
        modal: <SetCommitments plan={ plan } commitments={ commitments } />
      }
    },
    buttons: commitments.length > 0 && plan.status !== 'completed' && (plan.status === 'pending' || user.id === plan.supervisor_id) ? [
      { label: 'Make Commitments', color: 'blue', modal: <SetCommitments plan={ plan } commitments={ commitments } /> }
    ]: null
  }

  return <List { ...list } />

}

Commitments.propTypes = {
  plan: PropTypes.object,
  commitments: PropTypes.array,
  user: PropTypes.object
}

export default Commitments
