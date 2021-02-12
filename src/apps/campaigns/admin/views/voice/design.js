import VoiceDesigner from '@apps/campaigns/admin/components/voice_designer'
import PropTypes from 'prop-types'
import { Page } from '@admin'
import React from 'react'

class Design extends React.Component {

  static propTypes = {
    campaign: PropTypes.object,
    current: PropTypes.object,
    versions: PropTypes.array
  }

  render() {
    return <VoiceDesigner { ...this._getVoiceDesigner() } />
  }

  _getVoiceDesigner() {
    const { campaign, current, versions } = this.props
    return {
      campaign: {
        ...campaign,
        steps: current.value.steps
      },
      endpoint: `/api/admin/campaigns/voice/${campaign.id}/config`,
      program: campaign.program,
      versions
    }
  }

}

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/campaigns/voice/${props.params.id}`,
  versions: `/api/admin/crm_voice_campaigns/${props.params.id}/config/versions`,
  current: `/api/admin/crm_voice_campaigns/${props.params.id}/config/versions/current`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Voice Campaign',
  component: Design
})

export default Page(mapResourcesToPage, mapPropsToPage)
