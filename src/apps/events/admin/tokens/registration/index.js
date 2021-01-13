import ContactToken from '@apps/crm/admin/tokens/contact'
import PropTypes from 'prop-types'
import React from 'react'

const RegistrationToken = (registration) => {
  const { first_name, last_name } = registration.data
  const contact = {
    id: registration.id,
    display_name: `${first_name} ${last_name}`,
    initials: `${first_name[0]}${last_name[0]}`
  }
  return <ContactToken { ...contact } />
}

RegistrationToken.propTypes = {
  registration: PropTypes.object
}

export default RegistrationToken
