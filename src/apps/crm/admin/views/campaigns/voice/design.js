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
      properties: this._getProperties(),
      tokens: this._getTokens()
    }
  }

  _getProperties() {
    return [
      { label: 'First Name', name: 'first_name', type: 'textfield' },
      { label: 'Last Name', name: 'last_name', type: 'textfield' },
      { label: 'Email', name: 'email', type: 'emailfield' }
    ]
  }

  _getTokens() {
    return [
      { title: 'Contact Variables', tokens: [
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
