import SMSDesigner from '@apps/campaigns/admin/components/sms_designer'
import PropTypes from 'prop-types'
import { Page } from '@admin'
import React from 'react'

class Design extends React.Component {

  static propTypes = {
    campaign: PropTypes.object
  }

  render() {
    return <SMSDesigner { ...this._getSMSDesigner() } />
  }

  _getSMSDesigner() {
    const { campaign } = this.props
    return {
      campaign,
      entity: `crm_sms_campaigns/${campaign.id}`,
      program: campaign.program
    }
  }

}

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/campaigns/sms/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'SMS Campaign',
  component: Design
})

export default Page(mapResourcesToPage, mapPropsToPage)
