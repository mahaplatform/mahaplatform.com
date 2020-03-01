import ValuesFields from './valuesfield'
import * as options from './variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Conditional extends React.PureComponent {

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
  _handleChangeField = this._handleChangeField.bind(this)
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
    const { fields } = this.props
    const { config } = this.state
    return {
      title: 'Conditional',
      onChange: this._handleUpdate,
      onChangeField: this._handleChangeField,
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
              { name: 'token', type: 'dropdown', options: fields, value: 'token', text: 'name', defaultValue: config.token },
              ...this._getComparison()
            ] }
          ]
        }
      ]
    }
  }

  _getCode() {
    return _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
  }

  _getComparison() {
    const { fields } = this.props
    const { config } = this.state
    const { token, comparison } = config
    if(!token) return []
    const field = _.find(fields, { token })
    const comparisons = options.comparisons.filter(comparison => {
      return !comparison.types || _.includes(comparison.types, field.type)
    })
    if(_.includes(['checkbox'], field.type)) return []
    if(_.includes(['filefield'], field.type)) return []
    const items = [
      { name: 'comparison', type: 'radiogroup', options: comparisons, required: true, defaultValue: comparison }
    ]
    if(_.includes(['radiogroup','dropdown','checkboxes'], field.type)) {
      if(_.includes(['$in','$nin','$int','$nint'], comparison)) {
        items.push({ name: 'options', type: 'checkboxes', options: field.options, required: true, defaultValue: config.options })
      } else if(_.includes(['$eq','$neq'], comparison)) {
        items.push({ name: 'option', type: 'radiogroup', options: field.options, required: true, defaultValue: config.option })
      }
    } else if(_.includes(['textfield','emailfield'], field.type)) {
      if(_.includes(['$eq','$neq','$ct','$nct'], comparison)) {
        items.push({ name: 'option', type: 'textfield', placeholder: 'Enter Value', defaultValue: config.option })
      } else if(_.includes(['$in','$nin'], comparison)) {
        items.push({ name: 'options', type: ValuesFields, defaultValue: config.options })
      }
    }
    return items
  }

  _getDefault() {
    return {
      token: null,
      comparison: null,
      options: []
    }
  }

  _getOptions(token) {
    const { fields } = this.props
    const field = _.find(fields, { token })
    if(field.type === 'checkbox') return [
      { code: this._getCode(), value: 'checked', text: 'is checked '},
      { code: this._getCode(), value: 'unchecked', text: 'is not checked '}
    ]
    if(field.type === 'filefield') return [
      { code: this._getCode(), value: 'uploaded', text: 'was uploaded '},
      { code: this._getCode(), value: 'notuploaded', text: 'was not uploaded '}
    ]
    return [
      { code: this._getCode(), value: '', text: '' }
    ]
  }

  _handleChange() {
    const { config } = this.state
    const { fields } = this.props
    const { token } = config
    const field = _.find(fields, { token })
    if(!token) return
    this.props.onChange({
      token: config.token,
      comparison: config.comparison,
      options: [
        ...config.options.filter(option => {
          return option.code !== 'else'
        }),
        ...!_.includes(['checkbox','filefield'], field.type) ? [
          { code: 'else', value: 'else', text: 'else' }
        ] : []
      ]
    })
  }

  _handleChangeField(key, value) {
    const { config } = this.state
    if(key === 'token') {
      this.setState({
        config: {
          ...config,
          token: value,
          comparison: config.comparison || '$eq',
          options: this._getOptions(value)
        }
      })
    } else if(key === 'option') {
      this.setState({
        config: {
          ...config,
          options: config.options.map((option, index) => ({
            ...option,
            value: (index === 0) ? value : option.value,
            text: (index === 0) ? value : option.value
          }))
        }
      })
    }
  }

  _handleDone() {
    this.props.onDone()
  }

  _handleUpdate(config) {
    this.setState({
      config: {
        ...this.state.config,
        ...config
      }
    })
  }

}

export default Conditional
