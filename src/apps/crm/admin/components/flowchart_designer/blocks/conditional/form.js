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
    code: null,
    comparison: null,
    value: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { fields } = this.props
    return {
      title: 'Question',
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
            { label: 'If', type: 'segment', fields: [
              { name: 'code', type: 'dropdown', options: fields, value: 'code', text: 'name' },
              ...this._getComparison()
            ] }
          ]
        }
      ]
    }
  }

  _getComparison() {
    const { fields } = this.props
    const { code, comparison } = this.state
    if(!code) return []
    const field = _.find(fields, { code })
    const comparisons = options.comparisons.filter(comparison => {
      return !comparison.types || _.includes(comparison.types, field.type)
    })
    const items = [
      { name: 'comparison', type: 'radiogroup', options: comparisons, required: true }
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

  _handleChange(config) {
    this.setState(config)
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default IfElse
