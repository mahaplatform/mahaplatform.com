import PropTypes from 'prop-types'
import { Form } from '@client'
import React from 'react'

class Forward extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    code: PropTypes.string,
    token: PropTypes.string
  }

  state = {
    mode: 'form'
  }

  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { mode } = this.state
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
            { mode === 'form' &&
              <div className="maha-form-body">
                <Form { ...this._getForm() } />
              </div>
            }
            { mode === 'thankyou' &&
              <div className="maha-form-thankyou">
                Thank you! We&apos;ve fowarded the email!
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

  _getForm() {
    const { code, token } = this.props
    return {
      endpoint: `/api/forward/${code}`,
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
    this.setState({
      mode: 'thankyou'
    })
  }


}

export default Forward
