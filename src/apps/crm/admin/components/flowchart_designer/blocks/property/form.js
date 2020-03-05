import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Properties extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array,
    properties: PropTypes.array,
    workflow: PropTypes.object,
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
    console.log({
      config: {
        ...this._getDefault(),
        ...this.props.config || {}
      }
    })
    this.setState({
      config: {
        ...this._getDefault(),
        ...this.props.config || {}
      }
    })
  }

  _getDefault() {
    return {
      overwrite: true
    }
  }

  _getForm() {
    const { properties } = this.props
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'Update Properties',
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
            { label: 'Property', name: 'name', type: 'lookup', prompt: 'Choose a property', options: properties, value: 'name', text: 'label', defaultValue: config.name },
            ...this._getValue()
          ]
        }
      ]
    }
  }

  _getValue() {
    const { config } = this.state
    const { properties } = this.props
    if(!config.name) return []
    const property = _.find(properties, { name: config.name })
    return property ? [
      { ...property, label: 'Value', name: 'value', required: true, defaultValue: config.value },
      { label: 'If contact property is already set', name: 'overwrite', type: 'radiogroup', options: [
        { value: true, text: 'Overwrite existing value' },
        { value: false, text: 'Do nothing' }
      ], defaultValue: config.overwrite, required: true }] : []
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(config) {
    this.setState({
      config: {
        ...this.state.config,
        ...config
      }
    })
  }

  _handleDone(config) {
    this.props.onDone(config)
  }

  _handleSubmit() {
    this.form.submit()
  }

}

export default Properties
