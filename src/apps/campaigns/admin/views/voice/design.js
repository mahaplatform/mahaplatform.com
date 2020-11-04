import VoiceDesigner from '../../components/voice_designer'
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
      endpoint: `/api/admin/campaigns/voice/${campaign.id}`,
      program: campaign.program
    }
  }

}

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/campaigns/voice/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Voice Campaign',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
