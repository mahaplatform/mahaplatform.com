import PropTypes from 'prop-types'
import { Form } from 'maha-client'
import React from 'react'

class Forward extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    code: PropTypes.string,
    token: PropTypes.string
  }

  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return (
      <div className="overlay">
        <div className="preferences">
          <div className="maha-form">
            <div className="maha-form-header">
              <div className="maha-form-header-details">
                <h1>Forward to a Friend</h1>
                <p>Fill in the form below to send a personalized copy of this email to your friend.</p>
              </div>
            </div>
            <div className="maha-form-body">
              <Form { ...this._getForm() } />
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getForm() {
    const { code, token } = this.props
    return {
      endpoint: `/api/crm/forward/${code}`,
      method: 'POST',
      captcha: true,
      submitText: 'Forward Email',
      token,
      fields: [
        { label: 'First Name', name: 'first_name', type: 'textfield', required: true },
        { label: 'Last Name', name: 'last_name', type: 'textfield', required: true },
        { label: 'Email', name: 'email', type: 'emailfield', required: true },
        { label: 'Message', name: 'message', type: 'textarea', rows: 5 }
      ],
      onSuccess: this._handleSuccess
    }
  }

  _handleSuccess(result) {
    console.log(result)
  }

}

export default Forward
