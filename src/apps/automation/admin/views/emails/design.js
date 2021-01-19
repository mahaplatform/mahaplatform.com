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
    if(email.store) return this._getOrderTokens(email.store)
    if(email.event) return this._getRegistrationTokens(email.event)
    if(email.form) return this._getResponseTokens(email.form)
    return []
  }

  _getPaymentTokens(model) {
    return {
      title: 'Payment Tokens',
      tokens: [
        { name: 'Method', token: `${model}.payment_method` },
        { name: 'Amount', token: `${model}.payment_amount` },
        { name: 'Card', token: `${model}.payment_card` },
        { name: 'Summary', token: `${model}.payment_summary` }
      ]
    }
  }

  _getRegistrationTokens(event) {
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
      },
      this._getPaymentTokens('registration')
    ]
  }

  _getResponseTokens(form) {
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
      },
      this._getPaymentTokens('response')
    ]
  }

  _getOrderTokens(store) {
    return [
      {
        title: 'Order Tokens',
        tokens: [
          { name: 'First Name', token: 'order.first_name' },
          { name: 'Last Name', token: 'order.last_name' },
          { name: 'Email', token: 'order.email' },
          ...store.contact_config.fields.filter(field => {
            return !_.includes(['text'], field.type)
          }).map(field => ({
            name: field.name.value,
            token: `order.${field.name.token}`
          }))
        ]
      },
      this._getPaymentTokens('order')
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
