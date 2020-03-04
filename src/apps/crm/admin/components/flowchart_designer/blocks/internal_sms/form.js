import { Button, Container, Form, UserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'
class SendSMS extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    users: PropTypes.array,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onTokens: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleDone = this._handleDone.bind(this)

  constructor(props) {
    super(props)
    const { config } = props
    this.state = {
      strategy: config.strategy || 'number'
    }
  }

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.props
    const { strategy } = this.state
    return {
      title: 'Send Internal SMS',
      onChange: this._handleChange,
      onChangeField: this._handleChangeField,
      onCancel: this._handleCancel,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { name: 'strategy', type: 'radiogroup', options: [{ value: 'number', text: 'Enter a phone number' },{ value: 'user', text: 'Choose a specific user'}], defaultValue: strategy },
            this._getStrategy(),
            { label: 'Message', name: 'message', type: 'textarea', placeholder: 'Enter a message', defaultValue: config.message, rows: 4, required: true, after: <Button { ...this._getTokens() } /> }
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { strategy } = this.state
    const { config, users } = this.props
    if(strategy === 'number') {
      return { label: 'Number', name: 'number', type: 'phonefield', required: true, placeholder: 'Enter a number' }
    } else {
      return { label: 'User', name: 'user_id', type: 'lookup', prompt: 'Choose a User', options: users, value: 'id', text: 'full_name', format: UserToken, required: true, defaultValue: _.get(config, 'user.id') }
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
    const { users } = this.props
    const user = _.find(users, { id: config.user_id })
    this.props.onChange({
      strategy: config.strategy,
      user: user ? {
        id: user.id,
        full_name: user.full_name
      } : null,
      message: config.message
    })
  }

  _handleChangeField(key, value) {
    if(key === 'strategy') {
      this.setState({
        [key]: value
      })
    }
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

export default Container(mapResources)(SendSMS)
