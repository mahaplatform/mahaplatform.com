import RecipientsField from '../../recipientsfield'
import { Container, Form } from 'maha-admin'
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
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      recipients: []
    }
  }

  _getForm() {
    const { config } = this.state
    const { users } = this.props
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
            { name: 'code', type: 'hidden', defaultValue: config.code },
            { label: 'Name', name: 'name', type: 'tokenfield', placeholder: 'Enter a name', instructions: `
              Provide a name for this call so you can evaluate whether or not
              the call was answered
            `, required: true, defaultValue: config.name },
            { label: 'Recipients', name: 'recipients', type: RecipientsField, users, instructions: `
              Add up to ten recipients. When an incoming call arrives,
              all phones will ring and the call will be transfered to the first
              phone to answer
            `, required: true, defaultValue: config.recipients }
          ]
        }
      ]
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
      is_active: {
        $eq: true
      }
    }
  }
})

export default Container(mapResources)(Dial)
