import { Form, UserToken } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Preview extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    user: PropTypes.object,
    onBack: PropTypes.func
  }

  form = null

  state = {
    config: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSend = this._handleSend.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.props
    return {
      reference: node => this.form = node,
      title: 'Send Preview',
      method: 'post',
      action: '/api/admin/automation/emails/preview',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Send', color: 'red', handler: this._handleSend }
      ],
      sections: [
        {
          fields: [
            { type: 'hidden', name: 'config', defaultValue: config },
            { type: 'segment', fields: [
              { name: 'strategy', type: 'radiogroup', deselectable: false, options: [
                { value: 'user', text: 'Choose a specific user' },
                { value: 'email', text: 'Enter an email address' }
              ], defaultValue: 'user' },
              ...this._getStrategy()
            ] }
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { admin } = this.context
    const { config } = this.state
    if(config.strategy === 'email') {
      return [
        { label: 'First Name', type: 'textfield', name: 'first_name', required: true },
        { label: 'Last Name', type: 'textfield', name: 'last_name', required: true },
        { label: 'Email', type: 'emailfield', name: 'email', required: true }
      ]
    } else {
      return [{ name: 'user_id', type: 'lookup', required: true, prompt: 'Choose a User', endpoint: '/api/admin/users', filter: { is_active: { $eq: true } }, value: 'id', text: 'full_name', format: UserToken, defaultValue: admin.user.id }]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleSend() {
    this.form.submit()
  }

  _handleSuccess() {
    this.props.onBack()
  }

}

const mapStateToProps = (state, props) => ({
  config: state.maha.designer[props.cid].config,
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Preview)
