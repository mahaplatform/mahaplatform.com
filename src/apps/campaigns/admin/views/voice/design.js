import VoiceDesigner from '@apps/campaigns/admin/components/voice_designer'
import PropTypes from 'prop-types'
import { Page } from '@admin'
import React from 'react'

class Design extends React.Component {

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
      entity: `crm_voice_campaigns/${campaign.id}`,
      program: campaign.program
    }
  }

}

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/campaigns/voice/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Voice Campaign',
  component: Design
})

export default Page(mapResourcesToPage, mapPropsToPage)
