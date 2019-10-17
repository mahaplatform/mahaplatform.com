import VoiceDesigner from '../../../components/voice_designer'
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
    workflow: null
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.workflow) return null
    return <VoiceDesigner { ...this._getVoiceDesigner() } />
  }

  componentDidMount() {
    this._handleFetch()
  }

  _getVoiceDesigner() {
    const { workflow } = this.state
    return {
      defaultValue: workflow.steps,
      onSave: this._handleSave
    }
  }

  _handleFetch() {
    const { page } = this.props
    const { id } = page.params
    this.context.network.request({
      method: 'get',
      endpoint: `/api/admin/crm/campaigns/voice/${id}/design`,
      onSuccess: this._handleSuccess
    })
  }

  _handleSave(steps) {
    const { page } = this.props
    const { id } = page.params
    this.context.network.request({
      method: 'patch',
      endpoint: `/api/admin/crm/campaigns/voice/${id}/design`,
      body: { steps },
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess(result) {
    this.setState({
      workflow: result.data
    })
  }

}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Voice Campaign',
  component: Designer
})

export default Page(null, mapPropsToPage)
