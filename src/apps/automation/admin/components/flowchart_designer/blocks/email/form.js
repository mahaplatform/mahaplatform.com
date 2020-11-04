import { Button, Form } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Email extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    campaign: PropTypes.object,
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
    this.setState({
      config: this.props.config || {}
    })
  }

  _getEndpoint() {
    const { campaign, workflow } = this.props
    if(campaign) return `/api/admin/crm/campaigns/${campaign.type}/${campaign.id}/emails`
    if(workflow) return `/api/admin/automation/workflows/${workflow.id}/emails`
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
          after: config.email_id ? (
            <div className="maha-form-section-after">
              <Button { ...this._getButton() } />
            </div>
          ) : null,
          fields: [
            { label: 'Email', name: 'email_id', type: 'lookup', required: true, prompt: 'Choose an email', endpoint: this._getEndpoint(), value: 'id', text: 'title', form: this._getEmailForm(), defaultValue: config.email_id }
          ]
        }
      ]
    }
  }

  _getButton() {
    const { config } = this.state
    return {
      label: 'Design Email',
      className: 'link',
      route: `/admin/automation/emails/${config.email_id}/design`
    }
  }

  _getEmailForm() {
    const { program, user } = this.props
    return {
      title: 'New Email',
      method: 'post',
      action: '/api/admin/automation/emails',
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program.id },
            ...this._getHiddenFields(),
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title', required: true },
            { label: 'Template', name: 'template_id', type: 'lookup', placeholder: 'Choose a template', endpoint: `/api/admin/crm/programs/${program.id}/templates`, value: 'id', text: 'title' },
            { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: `/api/admin/crm/programs/${program.id}/senders`, filter: { is_verified: { $eq: true } }, value: 'id', text: 'rfc822', required: true },
            { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter a reply to email address', required: true, defaultValue: user.email },
            { label: 'Subject', name: 'subject', type: 'textfield', emojis: true, placeholder: 'Enter a subject', required: true }
          ]
        }
      ]
    }
  }

  _getWorkflowFields() {
    const { workflow } = this.props
    const { event, form } = workflow
    if(form) {
      return [
        { name: 'form_id', type: 'hidden', defaultValue: form.id }
      ]
    } else if(event) {
      return [
        { name: 'event_id', type: 'hidden', defaultValue: event.id }
      ]
    }
    return []
  }

  _getHiddenFields() {
    const { campaign, workflow } = this.props
    if(workflow) {
      return [
        { name: 'workflow_id', type: 'hidden', defaultValue: workflow.id },
        ...this._getWorkflowFields()
      ]
    }
    return [
      { name: `${campaign.type}_campaign_id`, type: 'hidden', defaultValue: campaign.id }
    ]
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
