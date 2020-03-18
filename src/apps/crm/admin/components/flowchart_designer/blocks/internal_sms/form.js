import { Button, Container, Form, UserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class InternalSMS extends React.PureComponent {

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
      title: 'Send Internal SMS',
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
              { name: 'strategy', type: 'radiogroup', options: [{ value: 'user', text: 'Choose a specific user'},{ value: 'number', text: 'Enter a phone number' }], defaultValue: config.strategy },
              this._getStrategy()
            ] },
            { label: 'Message', type: 'segment', fields: [
              { name: 'message', type: 'textarea', placeholder: 'Enter a message', defaultValue: config.message, rows: 4, required: true },
              { name: 'asset_ids', type: 'attachmentfield', multiple: true, defaultValue: config.asset_ids }
            ], after: <Button { ...this._getTokens() } /> }
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { config } = this.state
    const { users } = this.props
    if(config.strategy === 'number') {
      return { name: 'number', type: 'phonefield', required: true, placeholder: 'Enter a number', defaultValue: config.number }
    } else {
      return { name: 'user_id', type: 'lookup', required: true, prompt: 'Choose a User', options: users, value: 'id', text: 'full_name', format: UserToken, defaultValue: _.get(config, 'user.id') }
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
  users: {
    endpoint: '/api/admin/users',
    filter: {
      cell_phone: {
        $nnl: true
      }
    }
  }
})

export default Container(mapResources)(InternalSMS)
