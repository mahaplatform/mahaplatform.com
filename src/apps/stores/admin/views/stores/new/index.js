import Confirmation from './confirmation'
import { MultiForm } from '@admin'
import PropTypes from 'prop-types'
import Contact from './contact'
import Program from './program'
import Details from './details'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <MultiForm { ...this._getMultiForm() } />
  }

  _getMultiForm() {
    return {
      title: 'New Store',
      action: '/api/admin/stores/stores',
      method: 'post',
      formatData: this._getData,
      getSteps: this._getSteps,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess
    }
  }

  _getData(store) {
    return {
      confirmation: store.confirmation,
      contact_config: store.contact_config,
      permalink: store.permalink,
      program_id: store.program.id,
      title: store.title
    }
  }

  _getSteps(formdata) {
    return [
      { label: 'Program', component: Program },
      { label: 'Details', component: Details },
      { label: 'Contact', component: Contact },
      { label: 'Confirmation', component: Confirmation }
    ]
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(store) {
    this.context.router.history.push(`/stores/stores/${store.id}`)
    this.context.modal.close()
  }

}

export default New
