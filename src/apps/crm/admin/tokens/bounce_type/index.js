import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const types = [
  { bounce_type: 'Undetermined', bounce_subtype: 'Undetermined', text: 'Unknown' },
  { bounce_type: 'Permanent', bounce_subtype: 'NoEmail', text: 'Non-existant' },
  { bounce_type: 'Permanent', bounce_subtype: 'Suppressed', text: 'Suppressed' },
  { bounce_type: 'Permanent', bounce_subtype: 'OnAccountSuppressionList', text: 'Suppressed' },
  { bounce_type: 'Permanent', bounce_subtype: 'General', text: 'Undeliverable' },
  { bounce_type: 'Transient', bounce_subtype: 'General', text: 'Other' },
  { bounce_type: 'Transient', bounce_subtype: 'MailboxFull', text: 'Mailbox Full' },
  { bounce_type: 'Transient', bounce_subtype: 'MessageTooLarge', text: 'Message Too Large' },
  { bounce_type: 'Transient', bounce_subtype: 'ContentRejected', text: 'Content Rejected' },
  { bounce_type: 'Transient', bounce_subtype: 'ContentRejected', text: 'Attachment Rejected' }
]

const BounceTypeToken = ({ bounce_type, bounce_subtype }) => {
  const type = _.find(types, { bounce_type, bounce_subtype }) || { bounce_type: 'Undetermined', text: 'Unknown' }
  return (
    <div className={`bounce-type-token ${bounce_type.toLowerCase()}`}>
      { type.text }
    </div>
  )
}

BounceTypeToken.propTypes = {
  bounce_type: PropTypes.string,
  bounce_subtype: PropTypes.string
}

export default BounceTypeToken
