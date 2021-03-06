import UserToken from '../../../tokens/user'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Form from '../../form'
import React from 'react'
import _ from 'lodash'
import qs from 'qs'

class Export extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    columns: PropTypes.array,
    endpoint: PropTypes.string,
    entity: PropTypes.string,
    filter: PropTypes.object,
    sort: PropTypes.string
  }

  state = {
    data: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { admin } = this.context
    return {
      title: 'Export Data',
      saveText: 'Export',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Columns', name: 'columns', type: 'checkboxes', required: true, options: this._getColumns(), defaultValue: this._getDefaults(), height: 200 },
            { label: 'Format', name: 'format', type: 'radiogroup', deselectable: false, required: true, options: [
              { value: 'xlsx', text: 'Excel' },
              { value: 'csv', text: 'CSV' }
            ], defaultValue: 'xlsx' },
            { label: 'Strategy', name: 'strategy', type: 'radiogroup', deselectable: false, required: true, options: [
              { value: 'download', text: 'Download the export file' },
              { value: 'self', text:  <span dangerouslySetInnerHTML={{ __html: `Email the export file to <strong>${admin.user.email}</strong>` }} /> },
              { value: 'user', text: 'Email the export file to another user' },
              { value: 'email', text: 'Email the export file to email address' }
            ], defaultValue: 'download' },
            ...this._getTarget()
          ]
        }
      ]
    }
  }

  _getColumns() {
    const { columns } = this.props
    return columns.map(column => ({
      value: column.key,
      text: column.label
    }))
  }

  _getDefaults() {
    const { columns } = this.props
    return columns.map(column => column.key)
  }

  _getTarget() {
    const { entity } = this.props
    const { data } = this.state
    if(data.strategy === 'download') return []
    const fields = []
    if(data.strategy === 'email') {
      fields.push({ name: 'email', type: 'emailfield', required: true })
    } else if(data.strategy === 'user') {
      fields.push({ name: 'user', type: 'lookup', required: true, prompt: 'Choose a User', endpoint: '/api/admin/users', filter: { is_active: { $eq: true } }, text: 'full_name', format: UserToken })
    }
    if(data.strategy !== 'download') {
      fields.push({ name: 'subject', type: 'textfield', required: true, defaultValue: `${_.capitalize(entity)} Export` })
      fields.push({ name: 'message', type: 'textarea', rows: 5, required: true, defaultValue: 'Here is an export' })
    }
    return [{ label: 'Email', type: 'segment', required: true, fields }]
  }

  _getEmail(data) {
    const { admin } = this.context
    const { email, strategy, user } = data
    if(strategy === 'self') return { value: admin.user.email, text: admin.user.email }
    if(strategy === 'user') return { value: user.email, text: user.full_name }
    if(strategy === 'email') return { value: email, text: email }
  }

  _getUrl(data) {
    const { endpoint, entity, filter, sort } = this.props
    const { columns, format } = data
    const query = qs.stringify({
      filename: pluralize(entity),
      download: true,
      $filter: filter,
      $sort: sort,
      $page: {
        limit: 0
      },
      $select: this._getColumns().filter(column => {
        return _.includes(columns, column.value)
      }).reduce((select, item) => ({
        ...select,
        [item.text]: item.value
      }), {})
    })
    return `${endpoint}.${format}?${query}`
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChange(data) {
    this.setState({ data })
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(data) {
    if(data.strategy === 'download') return this._handleDownload(data)
    this._handleSend(data)
  }

  _handleDownload(data) {
    const { admin } = this.context
    window.location.href = `${this._getUrl(data)}&token=${admin.team.token}`
    this.context.modal.close()
  }

  _handleSend(data) {
    const { flash, modal } = this.context
    const { format, message, subject } = data
    const { entity } = this.props
    const email = this._getEmail(data)
    this.context.network.request({
      endpoint: '/api/admin/exports',
      method: 'post',
      body: {
        to: email.value,
        filename: pluralize(entity),
        url: this._getUrl(data),
        format,
        subject,
        message
      },
      onFailure: () => {
        flash.set('error', 'Unable to export data')
      },
      onSuccess: () => {
        flash.set('success', <span>Export file successfully sent to <strong>{ email.text }</strong></span>)
        modal.close()
      }
    })
  }

}

export default Export
