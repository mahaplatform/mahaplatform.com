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

  const channels = []
  if(program.has_email_channel) channels.push('email')
  if(program.has_sms_channel) channels.push('sms')
  if(program.has_voice_channel) channels.push('voice')
  if(program.has_mail_channel) channels.push('mail')

  list.items = [
    { label: 'Title', content: program.title },
    { label: 'Phone Number', content: program.phone_number ? (
      <span>{ program.phone_number.formatted }</span>
    ) : <Button { ...button } /> },
    { label: 'Channels', content: channels.join(', ') }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  program: PropTypes.object
}

export default Details
