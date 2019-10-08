import SocialDesigner from '../../../components/social_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

class SocialCampaign extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    page: PropTypes.object
  }

  state = {
    campaign: null
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.campaign) return null
    return <SocialDesigner { ...this._getSocialDesigner() } />
  }

  componentDidMount() {
    this._handleFetch()
  }

  _getSocialDesigner() {
    const { campaign } = this.state
    return {
      defaultValue: campaign.config,
      onSave: this._handleSave
    }
  }

  _handleFetch() {
    const { page } = this.props
    const { id } = page.params
    this.context.network.request({
      method: 'get',
      endpoint: `/api/admin/crm/campaigns/social/${id}`,
      onSuccess: this._handleSuccess
    })
  }

  _handleSave(config) {
    const { page } = this.props
    const { id } = page.params
    this.context.network.request({
      method: 'patch',
      endpoint: `/api/admin/crm/campaigns/social/${id}`,
      body: { config },
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess(result) {
    this.setState({
      campaign: result.data
    })
  }

}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Social Campaign',
  component: SocialCampaign
})

export default Page(null, mapPropsToPage)
