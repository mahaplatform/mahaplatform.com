import ValuesFields from './valuesfield'
import * as options from './variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class IfElse extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array,
    workflow: PropTypes.object,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    config: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    if(!this.state.config) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: {
        ...this._getDefault(),
        ...this.props.config
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { config } = this.state
    if(!_.isEqual(config, prevState.config)) {
      this._handleChange()
    }
  }

  _getForm() {
    const fields = this._getFields()
    const { config } = this.state
    return {
      title: 'If / Then',
      onChange: this._handleUpdate,
      onCancel: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'If', type: 'segment', fields: [
              { name: 'code', type: 'dropdown', options: fields, value: 'code', text: 'name', defaultValue: config.code },
              ...this._getComparison()
            ] }
          ]
        }
      ]
    }
  }

  _getComparison() {
    const fields = this._getFields()
    const { config } = this.state
    const { code, comparison } = config
    if(!code) return []
    const field = _.find(fields, { code })
    const comparisons = options.comparisons.filter(comparison => {
      return !comparison.types || _.includes(comparison.types, field.type)
    })
    const items = [
      { name: 'comparison', type: 'radiogroup', options: comparisons, required: true, defaultValue: config.comparison }
    ]
    if(_.includes(['radiogroup','dropdown','checkboxes'], field.type)) {
      if(_.includes(['$in','$nin','$int','$nint'], comparison)) {
        items.push({ name: 'options', type: 'checkboxes', options: field.options, required: true, defaultValue: config.options })
      } else if(_.includes(['$eq','$neq'], comparison)) {
        items.push({ name: 'option', type: 'radiogroup', options: field.options, required: true, defaultValue: config.option })
      }
    } else if(_.includes(['textfield'], field.type)) {
      if(_.includes(['$eq','$neq'], comparison)) {
        items.push({ name: 'option', type: 'textfield', defaultValue: config.option })
      } else if(_.includes(['$in','$nin'], comparison)) {
        items.push({ name: 'options', type: ValuesFields, defaultValue: config.options })
      }
    } else if(!_.includes(['checkbox','filefield'], field.type)) {
      items.push({ name: 'value', type: 'textfield', required: true })
    }
    return items
  }

  _getDefault() {
    return {
      code: null,
      comparison: null,
      options: null
    }
  }

  _getFields() {
    const { fields } = this.props
    return fields.filter(field => {
      return field.type !== 'text' && field.name
    }).map(field => ({
      code: field.code,
      name: field.name.value,
      type: _.get(field, 'contactfield.type') || field.type,
      options: field.options
    }))
  }

  _getOptions(config) {
    const options = config.options || (config.option ? [config.option] : [])
    return options.map(value => {
      return (typeof(value) === 'string') ? { code: value, value, text: value } : value
    })
  }

  _handleChange() {
    const { config } = this.state
    this.props.onChange(config)
  }

  _handleDone() {
    this.props.onDone()
  }

  _handleUpdate(config) {
    this.setState({
      config: {
        ...this.state.config,
        ...config,
        options: this._getOptions(config)

      }
    })
  }

}

export default IfElse
