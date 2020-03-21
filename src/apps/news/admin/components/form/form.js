import { Avatar } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Form extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    attachments: PropTypes.array,
    text: PropTypes.string,
    onAddAttachments: PropTypes.func,
    onRemoveAttachment: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func
  }

  render() {
    const { admin } = this.context
    return (
      <div className="news-form-trigger">
        <div className="news-form-trigger-avatar">
          <Avatar user={ admin.user } />
        </div>
        <div className="news-form-trigger-label">
          <div className="news-form-trigger-placeholder">
            Post an announcement...
          </div>
        </div>
      </div>
    )
  }

}

export default Form
