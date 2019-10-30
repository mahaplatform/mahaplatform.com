import FormDesigner from '../../components/form_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

class Form extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    page: PropTypes.object
  }

  state = {
    form: null
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.form) return null
    return <FormDesigner { ...this._getFormDesigner() } />
  }

  componentDidMount() {
    this._handleFetch()
  }

  _getFormDesigner() {
    const { form } = this.state
    return {
      defaultValue: form.config,
      onSave: this._handleSave
    }
  }

  _handleFetch() {
    const { page } = this.props
    const { id } = page.params
    this.context.network.request({
      method: 'get',
      endpoint: `/api/admin/crm/forms/${id}`,
      onSuccess: this._handleSuccess
    })
  }

  _handleSave(config) {
    const { page } = this.props
    const { id } = page.params
    this.context.network.request({
      method: 'patch',
      endpoint: `/api/admin/crm/forms/${id}`,
      body: { config },
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess(result) {
    this.setState({
      form: result.data
    })
  }

}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Form',
  component: Form
})

export default Page(null, mapPropsToPage)
