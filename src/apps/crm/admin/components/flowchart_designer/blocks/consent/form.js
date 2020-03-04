import { actions, channel_types } from './variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Consent extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array,
    workflow: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onTokens: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config, fields } = this.props
    return {
      title: 'Update Consent',
      onChange: this._handleChange,
      onCancel: this._handleCancel,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { name: 'action', type: 'radiogroup', options: actions, required: true, defaultValue: config.action },
            { label: 'Channel', name: 'channel_type', type: 'radiogroup', options: channel_types, required: true, defaultValue: config.channel_type },
            { label: 'Field', name: 'token', type: 'dropdown', options: fields, required: true, value: 'token', text: 'name', defaultValue: config.token }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(config) {
    this.props.onChange(config)
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Consent
