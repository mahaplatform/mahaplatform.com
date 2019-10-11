import NumberField from '../../components/numberfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  state = {
    areacode: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Number',
      method: 'post',
      action: '/api/admin/team/numbers',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      saveText: 'Provision',
      sections: [
        {
          fields: [
            { label: 'Type', name: 'type', type: 'lookup', options: [{ value: 'voice', text: 'Voice / SMS' },{ value: 'fax', text: 'Fax' }], required: true },
            { label: 'Number', name: 'number', type: NumberField, required: true }
          ]
        }
      ]
    }
  }

  // _getNumbers() {
  //   const { areacode, address } = this.state
  //   if(!address || !areacode) return []
  //   return [
  //     { name: 'number', type: Numbers, address, areacode }
  //   ]
  // }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChangeField(name, value) {
    if(name === 'areacode') {
      this.setState({
        areacode: value
      })
    } else if(name === 'address') {
      this.setState({
        address: value
      })
    }
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default New
