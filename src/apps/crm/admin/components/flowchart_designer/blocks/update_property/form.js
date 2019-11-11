import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class UpdateProperty extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    field: null,
    overwrite: null,
    value: null,
    ready: false
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    if(!this.state.ready) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { config, fields } = this.props
    if(!config.field) return this.setState({ ready: true })
    const field = _.find(fields, { id: config.field.id })
    this.setState({
      field,
      overwrite: config.overwrite || 'yes',
      value: config.value,
      ready: true
    })
  }

  _getForm() {
    const { config, fields } = this.props
    return {
      title: 'Update Property',
      onChange: this._handleChange,
      onCancel: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Property', name: 'field_id', type: 'lookup', options: fields, value: 'id', text: 'label', defaultValue: _.get(config, 'field.id'), required: true },
            ...this._getField()
          ]
        }
      ]
    }
  }

  _getField() {
    const { field, overwrite, value } = this.state
    return field ? [
      { label: 'Overwrite Existing Value', name: 'overwrite', type: 'radiogroup', options: ['yes','no'], defaultValue: overwrite || 'yes', required: true },
      {
        ...field.config,
        label: 'Value',
        name: 'value',
        required: true,
        defaultValue: value
      }
    ] : []
  }

  _handleChange(config) {
    const { fields } = this.props
    const field = _.find(fields, { id: config.field_id })
    const overwrite = field ? config.overwrite : 'yes'
    const value = field ? config.value : undefined
    this.setState({ field, overwrite, value })
    this.props.onChange({
      field: field ? {
        id: field.id,
        label: field.label
      } : null,
      overwrite,
      value
    })
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default UpdateProperty
