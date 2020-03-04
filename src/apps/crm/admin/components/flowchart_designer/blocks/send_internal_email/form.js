import { Button, Container, Form, UserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class SendInternalEmail extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    users: PropTypes.array,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onTokens: PropTypes.func
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config, users } = this.props
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
            { label: 'User', name: 'user_id', type: 'lookup', options: users, value: 'id', text: 'full_name', format: UserToken, required: true, defaultValue: _.get(config, 'user.id') },
            { label: 'Subject', name: 'subject', type: 'textfield', placeholder: 'Enter a subject', required: true },
            { label: 'Body', name: 'body', type: 'textarea', placeholder: 'Enter a body', defaultValue: config.message, rows: 8, required: true, after: <Button { ...this._getTokens() } /> }
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

  _handleChange(config) {
    const { users } = this.props
    const user = _.find(users, { id: config.user_id })
    this.props.onChange({
      user: user ? {
        id: user.id,
        full_name: user.full_name
      } : null
    })
  }

  _handleDone() {
    this.props.onDone()
  }

}

const mapResources = (props, context) => ({
  users: {
    endpoint: '/api/admin/users'
  }
})

export default Container(mapResources)(SendInternalEmail)
