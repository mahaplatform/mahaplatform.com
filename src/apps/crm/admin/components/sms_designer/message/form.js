import { Button, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Message extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
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

  componentDidMount() {
    this.setState({
      config: this.props.config || {}
    })
  }

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'Send Message',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSubmit: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleSubmit }
      ],
      sections: [
        {
          fields: [
            { label: 'Message', name: 'message', type: 'textarea', required: true, placeholder: 'Enter a message', defaultValue: config.message, rows: 8, after: <Button { ...this._getTokens() } /> },
            { label: 'Attachments', name: 'asset_ids', type: 'attachmentfield', multiple: true, defaultValue: config.asset_ids }
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

export default Message
