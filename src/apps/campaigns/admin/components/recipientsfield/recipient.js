import { Form, UserToken } from '@admin'
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
      strategy: 'user'
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
            { label: 'Recipient', type: 'segment', fields: [
              { name: 'strategy', type: 'radiogroup', deselectable: false, options: [
                { value: 'user', text: 'Dial a user' },
                { value: 'number', text: 'Dial a phone number' }
              ], defaultValue: config.strategy },
              this._getStrategy()
            ] }
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { config } = this.state
    if(config.strategy === 'user') {
      return { name: 'user_id', type: 'lookup', required: true, prompt: 'Choose a User', endpoint: '/api/admin/users', filter: { is_active: { $eq: true } }, value: 'id', text: 'full_name', format: UserToken, defaultValue: config.user_id }
    } else if(config.strategy === 'number') {
      return { name: 'number', type: 'phonefield', required: true, placeholder: 'Enter a number', defaultValue: config.number }
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
    this.props.onDone(config)
    this.context.form.pop()
  }

}

export default Recipientsfield
