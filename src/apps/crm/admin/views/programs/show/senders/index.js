import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'
import New from './new'

const Senders = ({ program, senders }) => {

  const list = {
    items: senders.map((sender, index) => ({
      component: (props) => (
        <div className="token">
          { sender.rfc822 }
        </div>
      )
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
