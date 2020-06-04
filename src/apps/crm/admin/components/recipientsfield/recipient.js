import { Form, UserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Recipientsfield extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    onDone: PropTypes.func
  }

  state = {
    config: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    if(!this.state.config) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: {
        ...this._getDefault()
      }
    })
  }

  _getDefault() {
    return {
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      strategy: 'software'
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Recipient',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      saveText: 'Add',
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', value: config.code },
            { name: 'strategy', type: 'radiogroup', options: [
              { value: 'software', text: 'Dial a user\'s software phone' },
              { value: 'cell', text: 'Dial a user\'s cell phone' },
              { value: 'number', text: 'Dial a phone number' }
            ], defaultValue: config.strategy },
            this._getStrategy()

          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { config } = this.state
    if(config.strategy === 'number') {
      return { label: 'Number', name: 'number', type: 'phonefield', required: true, placeholder: 'Enter a number', defaultValue: config.number }
    } else if(config.strategy === 'software') {
      return { label: 'User', name: 'user_id', type: 'lookup', required: true, prompt: 'Choose a User', endpoint: '/api/admin/users', filter: { is_active: { $eq: true } }, value: 'id', text: 'full_name', format: UserToken, defaultValue: config.user_id }
    } else if(config.strategy === 'cell') {
      return { label: 'User', name: 'user_id', type: 'lookup', required: true, prompt: 'Choose a User', endpoint: '/api/admin/users', filter: { is_active: { $eq: true }, cell_phone: { $nnl: true } }, value: 'id', text: 'full_name', format: UserToken, defaultValue: config.user_id }
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleDone() {
    const { config } = this.state
    this.props.onDone({
      code: config.code,
      strategy: config.strategy,
      user_id: config.strategy !== 'number' ? config.user_id : null,
      number: config.strategy === 'number' ? config.number : null
    })
    this.context.form.pop()
  }

}

export default Recipientsfield
