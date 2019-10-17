import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Edit extends React.PureComponent {

  static propTypes = {
    config: PropTypes.array
  }

  _handleChange = this._handleChange.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this.getForm() } />
  }

  getForm() {
    return {
      title: 'Say',
      onChangeField: this._handleChangeField,
      onChange: this._handleChange,
      onCancel: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ]
    }
  }

  _handleChange(data) {
  }

  _handleChangeField(name, value) {
  }

  _handleDone() {
  }

}

export default Edit
