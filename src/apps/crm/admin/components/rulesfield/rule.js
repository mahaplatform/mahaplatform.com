import * as options from './variables'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Rule extends React.Component {

  static propTypes = {
    fields: PropTypes.array,
    onDone: PropTypes.func
  }

  form = null

  _handleCancel = this._handleCancel.bind(this)
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
              { name: 'comparison', type: 'radiogroup', options: options.comparisons, required: true },
              { name: 'value', type: 'textfield', required: true }
            ] },
            { label: 'Then', type: 'segment', fields: [
              { name: 'action', type: 'radiogroup', options: options.actions, required: true },
              { name: 'then_code', type: 'dropdown', options: fields, value: 'code', text: 'name', required: true }
            ] }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(rule) {
    this.props.onDone(rule)
  }

}

export default Rule
