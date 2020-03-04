import { Button, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class SendSMS extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    users: PropTypes.array,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onTokens: PropTypes.func
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.props
    return {
      title: 'Send SMS',
      onChange: this._handleChange,
      onCancel: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      instructions: 'If the contact does not have a phone number, they will be unenrolled from the workflow and labeled as lost',
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Message', name: 'message', type: 'textarea', defaultValue: config.message, rows: 4, required: true, after: <Button { ...this._getTokens() } /> }
          ]
        }
      ]
    }
  }

  _getTokens() {
    const { onTokens } = this.props
    return {
      label: 'You can use the these tokens',
      className: 'link',
      handler: onTokens
    }
  }

  _handleChange(config) {
    this.props.onChange(config)
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default SendSMS
