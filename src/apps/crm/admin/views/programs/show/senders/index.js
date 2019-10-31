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
          { sender.is_verified &&
            <div>
              verified
            </div>
          }
        </div>
      )
    })),
    empty: {
      icon: 'paper-plane-o',
      title: 'No senders',
      text: 'There are no senders for this program',
      button: {
        label: 'Add Sender',
        modal: <New program_id={ program.id } />
      }
    },
    buttons: senders.length > 0 ? [
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
