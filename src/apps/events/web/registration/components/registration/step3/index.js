import { Button, Form } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'
import flat from 'flat'

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
              <h2>Ticket and Demographic Information</h2>
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
        ...items.reduce((fields, item, i) => [
          ...fields,
          ...Array(item.quantity).fill(0).reduce((fields, i, index) => [
            ...fields,
            { label: `${item.name} Ticket ${index + 1}`, type: 'segment', fields: [
              { name: `tickets.${index}.ticket_type_id`, type: 'hidden', value: item.ticket_type_id },

              { label: 'Name', name: `tickets.${index}.name`, type: 'textfield', placeholder: 'Enter name', required: true },
              { label: 'Gender', name: `tickets.${index}.gender`, type: 'radiogroup', placeholder: 'Choose gender', options: [
                { value: 'female', text: 'Female' },
                { value: 'male', text: 'Male' },
                { value: 'other', text: 'Other' }
              ] },
              { label: 'Race', name: `tickets.${index}.race`, type: 'checkboxes', options: [
                { value: 'caucasion', text: 'Caucasion' },
                { value: 'african', text: 'African American' },
                { value: 'american_indian', text: 'American Indian' },
                { value: 'asian', text: 'Asian' },
                { value: 'pacific_islander', text: 'Hawaiian / Pacific Islander' },
                { value: 'other', text: 'Other' }
              ] },
              { label: 'Ethnicity', name: `tickets.${index}.ethnicity`, type: 'radiogroup', options: [
                { value: 'hispanic', text: 'Hispanic' },
                { value: 'non_hispanic', text: 'Non Hispanic' }
              ] }
            ] }
          ], [])
        ], [])
      ]
    }
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
