import { Button, Form } from '@client'
import PropTypes from 'prop-types'
import React from 'react'
import flat from 'flat'
import _ from 'lodash'

class Step3 extends React.Component {

  static propTypes = {
    event: PropTypes.object,
    items: PropTypes.array,
    onBack: PropTypes.func,
    onNext: PropTypes.func
  }

  form = null

  _handleBack = this._handleBack.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return (
      <div className="registration-panel">
        <div className="registration-panel-body">
          <div className="registration-panel-content">
            <div className="registration-step3">
              <p>
                In order to better serve our community, we collect basic
                demographic information to help measure our impact. Please
                provide basic information for each ticket you are purchasing.
              </p>
              <Form { ...this._getForm() } />
            </div>
          </div>
        </div>
        <div className="registration-panel-footer">
          <div className="registration-panel-footer-item">
            <Button { ...this._getBack() } />
          </div>
          <div className="registration-panel-footer-item">
            <Button { ...this._getNext() } />
          </div>
        </div>
      </div>
    )
  }

  _getBack() {
    return {
      label: '&laquo; Back',
      color: 'red',
      handler: this._handleBack
    }
  }

  _getForm() {
    const { items } = this.props
    return {
      reference: node => this.form = node,
      button: false,
      captcha: false,
      onSubmit: this._handleSubmit,
      fields: [
        ...items.reduce((fields, item) => [
          ...fields,
          ...Array(item.quantity).fill(0).reduce((ticketfields, i, index) => [
            ...ticketfields,
            { label: `${item.name} Ticket ${fields.length + index + 1}`, type: 'segment', fields: [
              ...this._getFields(item, fields.length + index)
            ] }
          ], [])
        ], [])
      ]
    }
  }

  _getFields(item, index) {
    const { event } = this.props
    const hidden = event.ticket_config ? event.ticket_config.hidden : []
    const custom = event.ticket_config ? event.ticket_config.fields : []
    const fields = [
      { name: `tickets.${index}.ticket_type_id`, type: 'hidden', value: item.ticket_type_id },
      { label: 'Name on Ticket', name: `tickets.${index}.name`, type: 'textfield', placeholder: 'Enter name', required: true }
    ]
    if(!_.includes(hidden, 'gender')) {
      fields.push({ label: 'Gender', name: `tickets.${index}.gender`, type: 'radiogroup', placeholder: 'Choose gender', options: [
        { value: 'female', text: 'Female' },
        { value: 'male', text: 'Male' },
        { value: 'other', text: 'Other' }
      ] })
    }
    if(!_.includes(hidden, 'age')) {
      fields.push({ label: 'Age', name: `tickets.${index}.age`, type: 'radiogroup', placeholder: 'Choose age range', options: [
        { value: '0_17', text: '0 - 17' },
        { value: '18_20', text: '18 - 20' },
        { value: '21_40', text: '21 - 40' },
        { value: '41', text: '41+' }
      ] })
    }
    if(!_.includes(hidden, 'race')) {
      fields.push({ label: 'Race', name: `tickets.${index}.race`, type: 'checkboxes', options: [
        { value: 'caucasian', text: 'Caucasian' },
        { value: 'african', text: 'African American' },
        { value: 'american_indian', text: 'American Indian' },
        { value: 'asian', text: 'Asian' },
        { value: 'pacific_islander', text: 'Hawaiian / Pacific Islander' },
        { value: 'other', text: 'Other' }
      ] })
    }
    if(!_.includes(hidden, 'ethnicity')) {
      fields.push({ label: 'Ethnicity', name: `tickets.${index}.ethnicity`, type: 'radiogroup', options: [
        { value: 'hispanic', text: 'Hispanic' },
        { value: 'non_hispanic', text: 'Non Hispanic' }
      ] })
    }
    return [
      ...fields,
      ...custom.map(field => ({
        ...field,
        name: `tickets.${index}.${field.code}`,
        ...field.config || {}
      }))
    ]
  }

  _getNext() {
    return {
      label: 'Next &raquo;',
      color: 'red',
      handler: this._handleNext
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleNext() {
    this.form.submit()
  }

  _handleSubmit(tickets) {
    const result = flat.unflatten(tickets, {
      safe: false,
      maxDepth: 3
    })
    this.props.onNext(result.tickets)
  }


}

export default Step3
