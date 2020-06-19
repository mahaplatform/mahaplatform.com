import { Button, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class SendSMS extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    program: PropTypes.object,
    users: PropTypes.array,
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
      message: null
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'Send SMS',
      onChange: this._handleChange,
      onCancel: this._handleCancel,
      onSubmit: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      instructions: 'If the contact does not have a phone number, they will be unenrolled from the workflow and labeled as lost',
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleSubmit }
      ],
      sections: [
        {
          fields: [
            { label: 'Message', type: 'segment', fields: [
              { name: 'message', type: 'smsfield', placeholder: 'Enter a message', defaultValue: config.message, rows: 4, required: true },
              { name: 'asset_ids', type: 'attachmentfield', multiple: true, defaultValue: config.asset_ids }
            ], after: <Button { ...this._getTokens() } /> }
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

export default SendSMS
