import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Senders = ({ program }) => {

  const senders = [
    { id: 1, name: 'Greg Kops', email: 'mochini@gmail.com' },
    { id: 2, name: 'CCE Tompkins', email: 'ccetompkins@cornell.edu' }
  ]

  const list = {}

  list.items = [
    ...senders.map((sender, index) => ({
      component: (
        <div className="token" key={`sender_${index}`}>
          <strong>{ sender.name }</strong><br />
          { sender.email }
        </div>
      )
    }))
  ]

  return <List { ...list } />

}

Senders.propTypes = {
  program: PropTypes.object
}

export default Senders
