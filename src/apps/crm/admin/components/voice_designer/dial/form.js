import { Container, Form, UserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Dial extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    users: PropTypes.array,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  form = null

  state = {
    config: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    if(!this.state.config) return null
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
      title: 'Dial',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
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
            ] }
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
      return { name: 'user_id', type: 'lookup', required: true, prompt: 'Choose a User', options: users, value: 'id', text: 'full_name', format: UserToken, defaultValue: _.get(config, 'user_id') }
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleDone() {
    const { config } = this.state
    this.props.onDone(config)
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

export default Container(mapResources)(Dial)
