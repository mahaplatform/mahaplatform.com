import EmailDesigner from '../../components/email_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

class Designer extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    email: PropTypes.object,
    fields: PropTypes.array,
    form: PropTypes.object
  }

  render() {
    return <EmailDesigner { ...this._getEmailDesigner() } />
  }

  _getEmailDesigner() {
    const { email, form, fields } = this.props
    return {
      defaultValue: email.config,
      endpoint: `/api/admin/crm/emails/${email.id}`,
      program_id: email.program.id,
      tokens: [
        { title: 'Response Tokens', tokens: form.config.fields.filter(field => {
          return field.type !== 'text'
        }).reduce((tokens, field) => [
          ...tokens,
          {
            name: field.name.value,
            token: `response.${field.name.token}`
          },
          ...field.type === 'productfield' ? [{
            name: `${field.name.value} Summary`,
            token: `response.${field.name.token}_summary`
          }] : []
        ], []) },
        { title: 'Contact Tokens', tokens: [
          { name: 'Full Name', token: 'contact.full_name' },
          { name: 'First Name', token: 'contact.first_name' },
          { name: 'Last Name', token: 'contact.last_name' },
          { name: 'Email', token: 'contact.email' }
        ] },
        { title: 'Email Tokens', tokens: [
          { name: 'Preferences Link', token: 'email.preferences_link' },
          { name: 'Web Link', token: 'email.web_link' }
        ] }
      ]
    }
  }

}

const mapResourcesToPage = (props, context) => ({
  email: `/api/admin/crm/forms/${props.params.id}/email`,
  fields: '/api/admin/crm/fields',
  form: `/api/admin/crm/forms/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
