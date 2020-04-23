import { Button, Form } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Email extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    program: PropTypes.object,
    user: PropTypes.object,
    workflow: PropTypes.object,
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
    console.log(this.props.config)
    this.setState({
      config: this.props.config || {}
    })
  }

  _getForm() {
    const { workflow } = this.props
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
          after: config.email_id ? (
            <div className="maha-form-section-after">
              <Button { ...this._getButton() } />
            </div>
          ) : null,
          fields: [
            { label: 'Email', name: 'email_id', type: 'lookup', required: true, prompt: 'Choose an email', endpoint: `/api/admin/crm/workflows/${workflow.id}/emails`, value: 'id', text: 'title', form: this._getEmailForm(), defaultValue: config.email_id }
          ]
        }
      ]
    }
  }

  _getButton() {
    const { config } = this.state
    console.log(config)
    return {
      label: 'Design Email',
      className: 'link',
      route: `/admin/crm/emails/${config.email_id}/design`
    }
  }

  _getEmailForm() {
    const { program, user, workflow } = this.props
    return {
      title: 'New Email',
      method: 'post',
      action: '/api/admin/crm/emails',
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program.id },
            { name: 'workflow_id', type: 'hidden', defaultValue: workflow.id },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title', required: true },
            { label: 'Template', name: 'template_id', type: 'lookup', placeholder: 'Choose a template', endpoint: `/api/admin/crm/programs/${program.id}/templates`, value: 'id', text: 'title' },
            { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: `/api/admin/crm/programs/${program.id}/senders`, value: 'id', text: 'rfc822', required: true },
            { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter a reply to email address', required: true, defaultValue: user.email },
            { label: 'Subject', name: 'subject', type: 'textfield', placeholder: 'Enter a subject', required: true }

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

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Email)
