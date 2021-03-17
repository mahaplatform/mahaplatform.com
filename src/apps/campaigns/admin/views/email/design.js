import EmailDesigner from '@apps/automation/admin/components/email_designer/wrapper'
import PropTypes from 'prop-types'
import { Page } from '@admin'
import React from 'react'

class Designer extends React.Component {

  static propTypes = {
    campaign: PropTypes.object
  }

  render() {
    return <EmailDesigner { ...this._getEmailDesigner() } />
  }

  _getEmailDesigner() {
    const { campaign } = this.props
    return {
      defaultValue: campaign.config,
      editable: true,
      endpoint: `/api/admin/campaigns/email/${campaign.id}`,
      program: campaign.program
    }
  }

}

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/campaigns/email/${props.params.email_id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
