import { Form, UserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class SendSMS extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    users: PropTypes.array,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config, users } = this.props
    return {
      title: 'Send SMS',
      onChange: this._handleChange,
      onCancel: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'User', name: 'user_id', type: 'lookup', options: users, value: 'id', text: 'full_name', format: UserToken, defaultValue: _.get(config, 'user.id'), required: true },
            { label: 'Message', name: 'message', type: 'textarea', defaultValue: config.message, required: true }
          ]
        }
      ]
    }
  }

  _handleChange(config) {
    const { users } = this.props
    const user = _.find(users, { id: config.user_id })
    this.props.onChange({
      user: user ? {
        id: user.id,
        full_name: user.full_name
      } : null,
      message: config.message
    })
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default SendSMS
