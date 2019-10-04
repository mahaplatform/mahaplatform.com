import SocialDesigner from '../../components/social_designer'
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
    form: null
  }

  // _handleFetch = this._handleFetch.bind(this)
  // _handleSave = this._handleSave.bind(this)
  // _handleSuccess = this._handleSuccess.bind(this)

  render() {
    // if(!this.state.form) return null
    return <SocialDesigner { ...this._getSocialDesigner() } />
  }

  // componentDidMount() {
  //   this._handleFetch()
  // }

  _getSocialDesigner() {
    // const { form } = this.state
    return {
      // defaultValue: form.config,
      // onSave: this._handleSave
    }
  }

  // _handleFetch() {
  //   const { page } = this.props
  //   const { program_id, id } = page.params
  //   this.context.network.request({
  //     method: 'get',
  //     endpoint: `/api/admin/crm/programs/${program_id}/forms/${id}`,
  //     onSuccess: this._handleSuccess
  //   })
  // }
  //
  // _handleSave(config) {
  //   const { page } = this.props
  //   const { program_id, id } = page.params
  //   this.context.network.request({
  //     method: 'patch',
  //     endpoint: `/api/admin/crm/programs/${program_id}/forms/${id}`,
  //     body: { config },
  //     onSuccess: this._handleSuccess
  //   })
  // }
  //
  // _handleSuccess(result) {
  //   this.setState({
  //     form: result.data
  //   })
  // }

}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Social Campaign',
  component: SocialCampaign
})

export default Page(null, mapPropsToPage)
