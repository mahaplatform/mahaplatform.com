import * as options from './variables'
import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Rule from './rule'
import _ from 'lodash'

class RulesField extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    cid: PropTypes.string,
    defaultValue: PropTypes.array,
    fields: PropTypes.array,
    rules: PropTypes.array,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { rules } = this.props
    return (
      <div className="crm-rulesfield">
        { rules.length > 0 &&
          <div className="crm-rulesfield-rules">
            { rules.map((rule, index) => (
              <div className="crm-rulesfield-rule" key={`rule_${index}`}>
                <div className="crm-rulesfield-rule-label">
                  { this._getDescription(rule) }
                </div>
                <div className="crm-rulesfield-rule-remove" onClick={ this._handleRemove.bind(this, index) }>
                  <i className="fa fa-times" />
                </div>
              </div>
            ))}
          </div>
        }
        <Button { ...this._getButton() } />
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { rules } = this.props
    if(!_.isEqual(rules, prevProps.rules)) {
      this.props.onChange(rules)
    }
  }

  _getButton() {
    return {
      label: 'Add Rule',
      className: 'link',
      handler: this._handleNew
    }
  }

  _getComparison(if_field, rule) {
    return options.comparisons.find(comparison => {
      return rule.comparison === comparison.value && _.includes(comparison.types, if_field.type)
    })
  }

  _getDescription(rule) {
    const { fields } = this.props
    const action = _.find(options.actions, { value: rule.action })
    const if_field = _.find(fields, { code: rule.if_code })
    const then_field = _.find(fields, { code: rule.then_code })
    const comparison = this._getComparison(if_field, rule)
    const parts = [`If ${if_field.name} ${comparison.text}`]
    if(rule.value) parts.push(` '${rule.value}'`)
    parts.push(`, then ${action.text} ${then_field.name}`)
    return parts.join('')
  }

  _getRule() {
    const { cid, fields } = this.props
    return {
      cid,
      fields,
      onDone: this._handleAdd,
      onCancel: this._handleCancel
    }
  }

  _handleAdd(rule) {
    this.context.form.pop()
    this.props.onAdd(rule)
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleNew() {
    this.context.form.push(Rule, this._getRule())
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

}

export default RulesField
