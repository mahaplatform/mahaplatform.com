import EmailDesigner from '../../components/email_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

class Template extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    page: PropTypes.object,
    template: PropTypes.object
  }

  state = {
    template: null
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.template) return null
    return <EmailDesigner { ...this._getEmailDesigner() } />
  }

  componentDidMount() {
    this._handleFetch()
  }

  _getEmailDesigner() {
    const { template } = this.state
    return {
      defaultValue: template.config,
      onSave: this._handleSave
    }
  }

  _handleFetch() {
    const { page } = this.props
    const { id } = page.params
    this.context.network.request({
      method: 'get',
      endpoint: `/api/admin/crm/templates/${id}`,
      onSuccess: this._handleSuccess
    })
  }

  _handleSave(config) {
    const { page } = this.props
    const { id } = page.params
    this.context.network.request({
      method: 'patch',
      endpoint: `/api/admin/crm/templates/${id}`,
      body: { config },
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess(result) {
    this.setState({
      template: result.data
    })
  }

}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Template',
  component: Template
})

export default Page(null, mapPropsToPage)
