import { Button, Form, UserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class InternalEmail extends React.PureComponent {

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
      strategy: 'user'
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'Send Internal Email',
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
            { label: 'Recipient', type: 'segment', fields: [
              { name: 'strategy', type: 'radiogroup', options: [{ value: 'user', text: 'Choose a specific user'},{ value: 'email', text: 'Enter an email address' }], defaultValue: config.strategy },
              this._getStrategy()
            ] },
            { label: 'Email', type: 'segment', fields: [
              { name: 'subject', type: 'textfield', placeholder: 'Enter a subject', required: true, defaultValue: config.subject },
              { name: 'body', type: 'textarea', placeholder: 'Enter a body', defaultValue: config.body, rows: 8, required: true }
            ], after: <Button { ...this._getTokens() } /> }
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { config } = this.state
    if(config.strategy === 'email') {
      return { name: 'email', type: 'emailfield', required: true, placeholder: 'Enter an email', defaultValue: config.email }
    } else {
      return { name: 'user_id', type: 'lookup', required: true, prompt: 'Choose a User', endpoint: '/api/admin/users', value: 'id', text: 'full_name', format: UserToken, defaultValue: config.user_id }
    }
  }

  _getTokens() {
    const { onTokens } = this.props
    return {
      label: 'You can use the these tokens in both the subject and body',
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

export default InternalEmail
