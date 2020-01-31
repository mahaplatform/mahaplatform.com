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

  _getDescription(rule) {
    const { fields } = this.props
    const action = _.find(options.actions, { value: rule.action })
    const comparison = _.find(options.comparisons, { value: rule.comparison })
    const if_field = _.find(fields, { code: rule.if_code })
    const then_field = _.find(fields, { code: rule.then_code })
    const parts = ['If',if_field.name,comparison.text,rule.value,', then',action.text,then_field.name]
    return parts.join(' ')
  }

  _getRule() {
    const { fields } = this.props
    return {
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
