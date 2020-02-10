import PropTypes from 'prop-types'
import Form from './form'
import React from 'react'

class Preferences extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    email_address: PropTypes.object,
    mailing_address: PropTypes.object,
    phone_number: PropTypes.object,
    program: PropTypes.object,
    token: PropTypes.string,
    topics: PropTypes.array
  }

  render() {
    const { contact, email_address, mailing_address, phone_number, program, topics } = this.props
    return (
      <div className="overlay">
        <div className="preferences">
          <div className="panel">
            <div className="panel-header">
              <div className="panel-header-logo">
                <img src={`/imagecache/fit=cover&w=80&h=80${program.logo}`} />
              </div>
              <div className="panel-header-details">
                <h1>{ program.title }</h1>
                <p><strong>Communication Preferences for { contact.full_name }</strong></p>
              </div>
            </div>
            <div className="panel-body">
              <Form { ...this._getForm() } />
            </div>
            <div className="panel-footer">
              <p><strong>Not your email address?</strong></p>
              <p>
                An email may have been forwarded to you from a friend or
                colleague. Please contact them directly to stop receiving
                forwarded emails
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getForm() {
    return this.props
  }

}

export default Preferences
