import SenderToken from '@apps/crm/admin/tokens/sender'
import PropTypes from 'prop-types'
import { List } from '@admin'
import React from 'react'
import Edit from './edit'
import New from './new'

const Senders = ({ program, senders }) => {

  const list = {
    items: senders.map((sender, index) => ({
      tasks: program.access_type === 'manage' ? [
        { label: 'Edit Sender', modal: <Edit sender={ sender } /> }
      ] : null,
      component: (props) => <SenderToken {...sender } />
    })),
    empty: {
      icon: 'paper-plane-o',
      title: 'No senders',
      text: 'There are no senders for this program',
      button: program.access_type === 'manage' ? {
        label: 'Add Sender',
        modal: <New program_id={ program.id } />
      } : null
    },
    buttons: program.access_type === 'manage' && senders.length > 0 ? [
      { label: 'Add Sender', color: 'blue', modal: <New program_id={ program.id } /> }
    ] : null
  }

  return <List { ...list } />

}

Senders.propTypes = {
  program: PropTypes.object,
  senders: PropTypes.array
}

export default Senders
