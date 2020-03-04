import { Container, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Property extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    properties: PropTypes.array,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onTokens: PropTypes.func
  }

  state = {
    property_id: null,
    overwrite: null,
    value: null,
    ready: false
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    if(!this.state.ready) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { config, properties } = this.props
    if(!config.property) return this.setState({ ready: true })
    const property = _.find(properties, { id: config.property.id })
    this.setState({
      property,
      overwrite: config.overwrite || 'yes',
      value: config.value,
      ready: true
    })
  }

  _getForm() {
    const { config, properties } = this.props
    return {
      title: 'Update Property',
      onChange: this._handleChange,
      onCancel: this._handleCancel,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Property', name: 'property_id', type: 'lookup', options: properties, value: 'id', text: 'label', defaultValue: _.get(config, 'property.id'), required: true },
            ...this._getProperty()
          ]
        }
      ]
    }
  }

  _getProperty() {
    const { property, overwrite, value } = this.state
    return property ? [
      {
        ...property.config,
        label: 'Value',
        name: 'value',
        required: true,
        defaultValue: value
      },
      { label: 'If contact property is already set', name: 'overwrite', type: 'radiogroup', options: [
        { value: 'yes', text: 'Overwrite existing value' },
        { value: 'no', text: 'Do nothing' }
      ], defaultValue: overwrite || 'yes', required: true }
    ] : []
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(config) {
    const { properties } = this.props
    const property = _.find(properties, { id: config.property_id })
    const overwrite = property ? config.overwrite : 'yes'
    const value = property ? config.value : undefined
    this.setState({ property, overwrite, value })
    this.props.onChange({
      property: property ? {
        id: property.id,
        label: property.label
      } : null,
      overwrite,
      value
    })
  }

  _handleDone() {
    this.props.onDone()
  }

}

const mapResources = (props, context) => ({
  properties: {
    endpoint: `/api/admin/crm/programs/${props.workflow.program.id}/fields`
  }
})

export default Container(mapResources)(Property)
