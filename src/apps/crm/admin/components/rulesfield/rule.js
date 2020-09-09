import * as options from './variables'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Rule extends React.Component {

  static propTypes = {
    rules: PropTypes.array,
    fields: PropTypes.array,
    onCancel: PropTypes.func,
    onDone: PropTypes.func
  }

  form = null

  state = {
    rule: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { fields } = this.props
    return {
      title: 'Rule',
      reference: node => this.form = node,
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSubmit: this._handleSuccess,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Save', color: 'red', handler: this._handleSubmit }
      ],
      sections: [
        {
          fields: [
            { label: 'If', type: 'segment', fields: [
              { name: 'if_code', type: 'dropdown', options: fields, value: 'code', text: 'name' },
              ...this._getComparison()
            ] },
            ...this._getThen()
          ]
        }
      ]
    }
  }

  _getComparison() {
    const { fields } = this.props
    const { rule } = this.state
    const { if_code } = rule
    if(!if_code) return []
    const field = _.find(fields, { code: if_code })
    const comparisons = options.comparisons.filter(comparison => {
      return !comparison.types || _.includes(comparison.types, field.type)
    })
    console.log(fields, field.type, comparisons)
    const items = [
      { name: 'comparison', type: 'radiogroup', deselectable: false, options: comparisons, required: true }
    ]
    if(_.includes(['radiogroup','dropdown','checkboxes'], field.type)) {
      if(_.includes(['$in','$nin','$int','$nint'], rule.comparison)) {
        items.push({ name: 'value', type: 'checkboxes', options: field.options, required: true })
      } else if(_.includes(['$eq','$neq'], rule.comparison)) {
        items.push({ name: 'value', type: 'radiogroup', options: field.options, required: true })
      }
    } else if(!_.includes(['checkbox','filefield'], field.type)) {
      items.push({ name: 'value', type: 'textfield', required: true })
    }
    return items
  }

  _getThen() {
    const { rules } = this.props
    const { rule } = this.state
    const { if_code } = rule
    if(!if_code) return []
    const fields = this.props.fields.filter(field => {
      return field.code !== if_code && _.find(rules, { then_code: field.code }) === undefined
    })
    return [
      { label: 'Then', type: 'segment', fields: [
        { name: 'action', type: 'radiogroup', deselectable: false, options: options.actions, required: true },
        { name: 'then_code', type: 'dropdown', options: fields, value: 'code', text: 'name', required: true }
      ] }
    ]
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(rule) {
    this.setState({ rule })
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(rule) {
    this.props.onDone(rule)
  }

}

const mapStateToProps = (state, props) => ({
  rules: state.crm.rulesfield[props.cid].rules
})

export default connect(mapStateToProps)(Rule)
