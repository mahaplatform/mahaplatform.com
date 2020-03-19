import VoiceDesigner from '../../../components/voice_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

class Designer extends React.Component {

  static propTypes = {
    campaign: PropTypes.object
  }

  render() {
    return <VoiceDesigner { ...this._getVoiceDesigner() } />
  }

  _getVoiceDesigner() {
    const { campaign } = this.props
    return {
      campaign,
      endpoint: `/api/admin/crm/campaigns/voice/${campaign.id}`,
      fields: this._getFields(),
      properties: this._getProperties(),
      tokens: this._getTokens()
    }
  }

  _getProperties() {
    return [
      { label: 'Core Properties', fields: [
        { label: 'First Name', name: 'first_name', type: 'textfield' },
        { label: 'Last Name', name: 'last_name', type: 'textfield' },
        { label: 'Email', name: 'email', type: 'emailfield' }
      ] },
      { label: 'Primitive Pursuits', fields: [
        { label: 'One', name: 'one', type: 'textfield' },
        { label: 'Two', name: 'two', type: 'textfield' }
      ]}
    ]
  }

  _getFields() {
    return [
      { label: 'Contact', fields: [
        { name: 'First Name', key: 'first_name', type: 'text' },
        { name: 'Last Name', key: 'last_name', type: 'text' },
        { name: 'Email', key: 'email', type: 'text' },
        { name: 'Phone', key: 'phone', type: 'text' },
        { name: 'Street', key: 'street_1', type: 'text' },
        { name: 'City', key: 'city', type: 'text' },
        { name: 'State/Province', key: 'state_province', type: 'text' },
        { name: 'Postal Code', key: 'postal_code', type: 'text' },
        { name: 'Birthday', key: 'birthday', type: 'text' },
        { name: 'Spouse', key: 'spouse', type: 'text' }
      ] }
    ]
  }

  _getTokens() {
    return [
      { title: 'Contact Tokens', tokens: [
        { name: 'First Name', token: 'contact.first_name' },
        { name: 'Last Name', token: 'contact.last_name' },
        { name: 'Email', token: 'contact.email' }
      ] }
    ]
  }

}

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/crm/campaigns/voice/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Voice Campaign',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
