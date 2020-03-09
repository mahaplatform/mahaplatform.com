import VoiceDesigner from '../../../components/voice_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

class Designer extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    campaign: PropTypes.object,
    page: PropTypes.object,
    template: PropTypes.object
  }

  _handleSave = this._handleSave.bind(this)

  render() {
    return <VoiceDesigner { ...this._getVoiceDesigner() } />
  }

  _getVoiceDesigner() {
    const { campaign } = this.props
    return {
      campaign,
      properties: this._getProperties(),
      tokens: this._getTokens(),
      onSave: this._handleSave
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

  _handleSave(steps) {
    const { page } = this.props
    const { id } = page.params
    this.context.network.request({
      method: 'patch',
      endpoint: `/api/admin/crm/campaigns/voice/${id}`,
      body: { steps }
    })
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
