import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Preview extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    user: PropTypes.object,
    onBack: PropTypes.func
  }

  form = null

  _handleBack = this._handleBack.bind(this)
  _handleSend = this._handleSend.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config, user } = this.props
    return {
      reference: node => this.form = node,
      title: 'Send Preview',
      method: 'post',
      action: '/api/admin/crm/emails/preview',
      onCancel: this._handleBack,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Send', color: 'red', handler: this._handleSend }
      ],
      sections: [
        {
          fields: [
            { type: 'hidden', name: 'config', defaultValue: config },
            { label: 'First Name', type: 'textfield', name: 'first_name', required: true, defaultValue: user.first_name },
            { label: 'Last Name', type: 'textfield', name: 'last_name', required: true, defaultValue: user.last_name },
            { label: 'Email', type: 'emailfield', name: 'email', required: true, defaultValue: user.email }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSend() {
    this.form.submit()
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.designer[props.cid].config,
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Preview)
