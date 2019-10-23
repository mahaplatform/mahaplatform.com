import { Button, List } from 'maha-admin'
import PhoneNumber from './phone_number'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ program }) => {

  const list = {}

  const button = {
    label: 'Provision Phone Number',
    className: 'link',
    modal: <PhoneNumber program_id={ program.id } />
  }

  list.items = [
    { label: 'Title', content: program.title },
    { label: 'Phone Number', content: program.phone_number ? (
      <span>{ program.phone_number.formatted }</span>
    ) : <Button { ...button } /> }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  program: PropTypes.object
}

export default Details
