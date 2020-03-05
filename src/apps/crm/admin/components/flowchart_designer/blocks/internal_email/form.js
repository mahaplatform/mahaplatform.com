import { Button, Container, Form, UserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class InternalEmail extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
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
      strategy: 'email'
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
            { name: 'strategy', type: 'radiogroup', options: [{ value: 'email', text: 'Enter an email address' },{ value: 'user', text: 'Choose a specific user'}], defaultValue: config.strategy },
            this._getStrategy(),
            { label: 'Subject', name: 'subject', type: 'textfield', placeholder: 'Enter a subject', required: true, defaultValue: config.subject },
            { label: 'Body', name: 'body', type: 'textarea', placeholder: 'Enter a body', defaultValue: config.body, rows: 8, required: true, after: <Button { ...this._getTokens() } /> }
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { config } = this.state
    const { users } = this.props
    if(config.strategy === 'email') {
      return { label: 'Email', name: 'email', type: 'emailfield', required: true, placeholder: 'Enter an email', defaultValue: config.email }
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
    this.setState({ config })
  }

  _handleDone(config) {
    const { users } = this.props
    const user = _.find(users, { id: config.user_id })
    this.props.onDone({
      ...config,
      user: user ? {
        id: user.id,
        full_name: user.full_name
      } : null
    })
  }

  _handleSubmit() {
    this.form.submit()
  }

}

const mapResources = (props, context) => ({
  users: '/api/admin/users'
})

export default Container(mapResources)(InternalEmail)