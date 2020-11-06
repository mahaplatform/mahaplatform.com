import EmailDesigner from '../../components/email_designer/wrapper'
import PropTypes from 'prop-types'
import { Page } from '@admin'
import React from 'react'
import _ from 'lodash'

class Designer extends React.Component {

  static propTypes = {
    email: PropTypes.object
  }

  render() {
    return <EmailDesigner { ...this._getEmailDesigner() } />
  }

  _getEmailDesigner() {
    const { email } = this.props
    return {
      defaultValue: email.config,
      endpoint: `/api/admin/automation/emails/${email.id}`,
      program: email.program,
      tokens: this._getTokens()
    }
  }

  _getTokens() {
    const { email } = this.props
    if(email.event) return this._getEventTokens(email.event)
    if(email.form) return this._getFormTokens(email.form)
    return []
  }

  _getEventTokens(event) {
    return [
      {
        title: 'Registration Tokens',
        tokens: [
          { name: 'First Name', token: 'registration.first_name' },
          { name: 'Last Name', token: 'registration.last_name' },
          { name: 'Email', token: 'registration.email' },
          ...event.contact_config.fields.filter(field => {
            return !_.includes(['text'], field.type)
          }).map(field => ({
            name: field.name.value,
            token: `registration.${field.name.token}`
          }))
        ]
      }, {
        title: 'Payment Tokens',
        tokens: [
          { name: 'Method', token: 'registration.payment_method' },
          { name: 'Amount', token: 'registration.payment_amount' },
          { name: 'Card', token: 'registration.payment_card' },
          { name: 'Summary', token: 'registration.payment_summary' }
        ]
      }
    ]
  }

  _getFormTokens(form) {
    return [
      {
        title: 'Response Tokens',
        tokens: [
          ...form.config.fields.filter(field => {
            return !_.includes(['text'], field.type)
          }).map(field => ({
            name: field.name.value,
            token: `response.${field.name.token}`
          }))
        ]
      }, {
        title: 'Payment Tokens',
        tokens: [
          { name: 'Method', token: 'response.payment_method' },
          { name: 'Amount', token: 'response.payment_amount' },
          { name: 'Card', token: 'response.payment_card' },
          { name: 'Summary', token: 'response.payment_summary' }
        ]
      }
    ]
  }

}

const mapResourcesToPage = (props, context) => ({
  email: `/api/admin/automation/emails/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
