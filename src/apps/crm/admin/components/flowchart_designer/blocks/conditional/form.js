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
    const { config } = this.props
    this.setState({ config })
  }

  componentDidUpdate(prevProps, prevState) {
    const { config } = this.state
    if(!_.isEqual(config, prevState.config)) {
      this._handleChange()
    }
  }

  _getForm() {
    const { config } = this.state
    const { fields } = this.props
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
            { label: 'Field', name: 'code', type: 'dropdown', options: fields, value: 'code', text: 'name', defaultValue: config.code },
            ...this._getComparison()
          ]
        }
      ]
    }
  }

  _getComparison() {
    const { fields } = this.props
    const { config } = this.state
    const { code, comparison } = config
    if(!code) return []
    const field = _.find(fields, { code })
    const comparisons = options.comparisons.filter(comparison => {
      return !comparison.types || _.includes(comparison.types, field.type)
    })
    const items = [
      { label: 'Comparison', name: 'comparison', type: 'radiogroup', options: comparisons, required: true }
    ]
    if(_.includes(['radiogroup','dropdown','checkboxes'], field.type)) {
      if(_.includes(['$in','$nin','$int','$nint'], comparison)) {
        items.push({ name: 'value', type: 'checkboxes', options: field.options, required: true })
      } else if(_.includes(['$eq','$neq'], comparison)) {
        items.push({ name: 'value', type: 'radiogroup', options: field.options, required: true })
      }
    } else if(!_.includes(['checkbox','filefield'], field.type)) {
      items.push({ name: 'value', type: 'textfield', required: true })
    }
    return items
  }

  _handleChange() {
    const { config } = this.state
    this.props.onChange({
      code: config.code,
      comparison: config.comparison,
      options: [
        { value: config.value, text: config.value },
        { value: 'else', text: 'Else' }
      ]
    })
  }

  _handleDone() {
    this.props.onDone()
  }

  _handleUpdate(config) {
    this.setState({ config })
  }

}

export default IfElse
