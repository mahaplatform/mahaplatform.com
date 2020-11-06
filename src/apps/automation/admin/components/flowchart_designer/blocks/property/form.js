import PropertyField from '../../../propertyfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Property extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array,
    program: PropTypes.object,
    properties: PropTypes.array,
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
      strategy: 'static',
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
            { label: 'Property', name: 'name', type: PropertyField, properties, defaultValue: config.name },
            ...this._getValue()
          ]
        }
      ]
    }
  }

  _getValue() {
    const { config } = this.state
    if(!config.name) return []
    const property = this._getField(config.name)
    return property ? [
      { ...property, label: null, placeholder: 'Enter value', name: 'value', required: true, defaultValue: config.value },
      { prompt: 'Overwrite value if property is already set', name: 'overwrite', type: 'checkbox', defaultValue: config.overwrite }
    ] : []
  }

  _getField(name) {
    const { properties } = this.props
    return properties.reduce((fields, group) => [
      ...fields,
      ...group.fields
    ], []).find(field => {
      return field.name === name
    })
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

export default Property
