import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Email extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
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
      config: this.props.config || {}
    })
  }

  _getForm() {
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'Send Email',
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
            { label: 'Email', name: 'email_id', type: 'lookup', required: true, prompt: 'Choose an email', endpoint: '/api/admin/crm/emails', value: 'id', text: 'display_name', form: this._getEmailForm(), defaultValue: config.email_id }
          ]
        }
      ]
    }
  }

  _getEmailForm() {
    const { program } = this.props
    return {
      title: 'New Email',
      method: 'post',
      action: '/api/admin/crm/emails',
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program.id },
            { label: 'Title', name: 'title', type: 'textfield' }
          ]
        }
      ]
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

export default Email
