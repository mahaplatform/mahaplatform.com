import EmailDesigner from '../../../components/email_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

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
      editable: _.includes(['active','draft','inactive'], campaign.status),
      endpoint: `/api/admin/crm/campaigns/email/${campaign.id}`,
      program: campaign.program
    }
  }

}

const mapResourcesToPage = (props, context) => ({
  campaign: `/api/admin/crm/campaigns/email/${props.params.email_id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
