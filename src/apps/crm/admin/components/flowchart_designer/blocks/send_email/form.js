import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class SendEmail extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    emails: PropTypes.array,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config, emails } = this.props
    return {
      title: 'Send Email',
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
            { label: 'Email', name: 'email_id', type: 'lookup', options: emails, value: 'id', text: 'title', required: true, defaultValue: _.get(config, 'email.id') }
          ]
        }
      ]
    }
  }

  _handleChange(config) {
    const { emails } = this.props
    const email = _.find(emails, { id: config.email_id })
    this.props.onChange({
      email: email ? {
        id: email.id,
        title: email.title
      } : null
    })
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default SendEmail
