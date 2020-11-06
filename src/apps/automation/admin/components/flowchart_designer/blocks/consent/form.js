import { actions, channel_types } from './variables'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Consent extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array,
    program: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onTokens: PropTypes.func
  }

  form = null

  state = {
    config: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: {
        ...this._getDefault(),
        ...this.props.config || {}
      }
    })
  }

  _getDefault() {
    return {
      action: 'add'
    }
  }

  _getForm() {
    const fields = this._getFields()
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'Update Consent',
      onChange: this._handleChange,
      onCancel: this._handleCancel,
      onSubmit: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleSubmit }
      ],
      sections: [
        {
          fields: [
            { name: 'action', type: 'radiogroup', options: actions, required: true, defaultValue: config.action },
            { label: 'Channel', name: 'channel_type', type: 'radiogroup', options: channel_types, required: true, defaultValue: config.channel_type },
            { label: 'Field', name: 'token', type: 'dropdown', options: fields, required: true, value: 'key', text: 'name', defaultValue: config.token }
          ]
        }
      ]
    }
  }

  _getFields() {
    const { fields } = this.props
    return fields.reduce((fields, field) => [
      ...fields,
      ...field.fields
    ], [])
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleDone(config) {
    this.props.onDone(config)
  }

  _handleSubmit() {
    this.form.submit()
  }

}

export default Consent
