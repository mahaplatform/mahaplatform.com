import PropTypes from 'prop-types'
import { Form } from 'maha-client'
import React from 'react'

class Forward extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    token: PropTypes.string
  }

  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { program } = this.props
    return (
      <div className="overlay">
        <div className="preferences">
          <div className="maha-form">
            <div className="maha-form-header">
              <div className="maha-form-header-logo">
                <img src={`/imagecache/fit=cover&w=80&h=80${program.logo}`} />
              </div>
              <div className="maha-form-header-details">
                <h1>{ program.title }</h1>
                <p>Forward to a Friend</p>
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
    const { token } = this.props
    const code = 'abcde'
    return {
      endpoint: `/api/crm/forward/${code}`,
      method: 'POST',
      captcha: true,
      submitText: 'Forward Email',
      token,
      fields: [
        { label: 'Name', name: 'name', type: 'textfield', required: true },
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
