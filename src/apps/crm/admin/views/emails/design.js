import EmailDesigner from '../../components/email_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

class Designer extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    page: PropTypes.object,
    template: PropTypes.object
  }

  state = {
    campaign: null
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.campaign) return null
    return <EmailDesigner { ...this._getEmailDesigner() } />
  }

  componentDidMount() {
    this._handleFetch()
  }

  _getEmailDesigner() {
    const { campaign } = this.state
    return {
      defaultValue: campaign.config,
      program_id: campaign.program.id,
      tokens: [
        { title: 'Response Variables', tokens: [
          { name: 'First Name', token: 'response.first_name' },
          { name: 'Last Name', token: 'response.last_name' },
          { name: 'Email', token: 'response.email' }
        ] },
        { title: 'Contact Variables', tokens: [
          { name: 'First Name', token: 'contact.first_name' },
          { name: 'Last Name', token: 'contact.last_name' },
          { name: 'Email', token: 'contact.email' }
        ] }
      ],
      onSave: this._handleSave
    }
  }

  _handleFetch() {
    const { page } = this.props
    const { id } = page.params
    this.context.network.request({
      method: 'get',
      endpoint: `/api/admin/crm/emails/${id}`,
      onSuccess: this._handleSuccess
    })
  }

  _handleSave(config) {
    const { page } = this.props
    const { id } = page.params
    this.context.network.request({
      method: 'patch',
      endpoint: `/api/admin/crm/emails/${id}`,
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
  title: 'Email',
  component: Designer
})

export default Page(null, mapPropsToPage)
