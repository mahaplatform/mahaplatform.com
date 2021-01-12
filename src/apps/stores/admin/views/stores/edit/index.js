import { MultiForm } from '@admin'
import PropTypes from 'prop-types'
import Contact from './contact'
import Details from './details'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    store: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <MultiForm { ...this._getMultiForm() } />
  }

  _getMultiForm() {
    const { store } = this.props
    return {
      title: 'Edit Store',
      endpoint: `/api/admin/stores/stores/${store.id}/edit`,
      action: `/api/admin/stores/stores/${store.id}`,
      method: 'patch',
      formatData: this._getData,
      getSteps: this._getSteps,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess
    }
  }

  _getData(store) {
    return {
      contact_config: store.contact_config,
      permalink: store.permalink,
      title: store.title
    }
  }

  _getSteps(formdata) {
    return [
      { label: 'Details', component: Details },
      { label: 'Contact', component: Contact }
    ]
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(store) {
    console.log(store)
    this.context.modal.close()
  }

}

export default Edit
