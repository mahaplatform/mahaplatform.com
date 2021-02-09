import VoiceDesigner from '../../components/voice_designer'
import PropTypes from 'prop-types'
import { Page } from '@admin'
import React from 'react'

class Designer extends React.Component {

  static propTypes = {
    campaign: PropTypes.object,
    current: PropTypes.object,
    versions: PropTypes.array
  }

  render() {
    return <VoiceDesigner { ...this._getVoiceDesigner() } />
  }

  _getVoiceDesigner() {
    const { campaign, current } = this.props
    return {
      campaign: {
        ...campaign,
        steps: current.value.steps
      },
      endpoint: `/api/admin/campaigns/voice/${campaign.id}/workflow`,
      program: campaign.program
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
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
