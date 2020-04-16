import { Image } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const EmailPreview = ({ email }) => (
  <div className="crm-email-preview">
    { email.has_preview &&
      <Image src={ `/${email.preview}` } transforms={{ h: 360 }} />
    }
  </div>
)

EmailPreview.propTypes = {
  email: PropTypes.object
}

export default EmailPreview
