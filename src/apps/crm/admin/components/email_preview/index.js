import { Image } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const EmailPreview = ({ src }) => (
  <div className="crm-email-preview">
    <Image src={ src } transforms={{ h: 360 }} />
  </div>
)

EmailPreview.propTypes = {
  src: PropTypes.string
}

export default EmailPreview
