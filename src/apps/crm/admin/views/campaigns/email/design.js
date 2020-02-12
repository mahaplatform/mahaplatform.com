import EmailDesigner from '../../../components/email_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

class Designer extends React.Component {

  static propTypes = {
    campaign: PropTypes.object,
    fields: PropTypes.array
  }

  render() {
    return <EmailDesigner { ...this._getEmailDesigner() } />
  }

  _getEmailDesigner() {
    const { campaign, fields } = this.props
    return {
      defaultValue: campaign.config,
      endpoint: `/api/admin/crm/campaigns/email/${campaign.id}`,
      program_id: campaign.program.id,
      tokens: [
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
  campaign: `/api/admin/crm/campaigns/email/${props.params.id}`,
  fields: '/api/admin/crm/fields'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
