import Numbers from '../../components/numbers'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.string
  }

  state = {
    address: null,
    areacode: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { program_id } = this.props
    return {
      title: 'New Number',
      method: 'post',
      action: `/api/admin/crm/numbers`,
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { type: 'fields', fields: [
              { name: 'address', type: 'addressfield', placeholder: 'Enter your address' },
              { name: 'areacode', type: 'numberfield', placeholder: 'Enter your area code' }
            ] },
            ...this._getNumbers()
          ]
        }
      ]
    }
  }

  _getNumbers() {
    const { areacode, address } = this.state
    if(!address || !areacode) return []
    return [
      { name: 'number', type: Numbers, address, areacode }
    ]
  }

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
