import OptInToken from '../../../../tokens/optin'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

const channels = [
  { value: 'email', text: 'Email' },
  { value: 'voice', text: 'Voice' },
  { value: 'sms', text: 'SMS' },
  { value: 'postal', text: 'Postal' }
]

class Consent extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    topics: PropTypes.array,
    workflow: PropTypes.object,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.props
    return {
      title: 'Update Consent',
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
            { label: 'Channel', name: 'channel', type: 'radiogroup', options: channels, required: true, defaultValue: config.channel }
          ]
        }
      ]
    }
  }

  _handleChange(config) {
    this.props.onChange(config)
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Consent
