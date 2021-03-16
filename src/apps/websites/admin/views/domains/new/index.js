import { MultiForm } from '@admin'
import PropTypes from 'prop-types'
import Register from './register'
import Transfer from './transfer'
import Contacts from './contacts'
import Type from './type'
import React from 'react'
import Dns from './dns'

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
      title: 'Add a Domain',
      action: '/api/admin/websites/domains',
      method: 'post',
      formatData: this._getData,
      getSteps: this._getSteps.bind(this),
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess
    }
  }

  _getData(domain) {
    return {
      name: domain.name,
      type: domain.type,
      ...domain.type !== 'dns' ? {
        registrant_contact: domain.registrant_contact,
        admin_contact: domain.admin_strategy === 'custom' ? domain.admin_contact : domain.registrant_contact,
        tech_contact: domain.tech_strategy === 'custom' ? domain.tech_contact : domain.registrant_contact
      } : {},
      ...domain.type !== 'transfer' ? {
        auth_code: domain.auth_code
      } : {}
    }
  }

  _getDetails(type) {
    if(type === 'transfer') {
      return [
        { label: 'Name', component: Transfer },
        { label: 'Contacts', component: Contacts }
      ]
    }
    if(type === 'dns') {
      return [
        { label: 'Name', component: Dns }
      ]
    }
    return [
      { label: 'Name', component: Register },
      { label: 'Contacts', component: Contacts }
    ]
  }

  _getSteps(formdata) {
    const data = formdata || {}
    return [
      { label: 'Type', component: Type },
      ...this._getDetails(data.type)
    ]
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(domain) {
    this.context.router.history.push(`/websites/domains/${domain.id}`)
    this.context.modal.close()
  }

}

export default New
