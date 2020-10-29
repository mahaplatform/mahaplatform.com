import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Item extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    entity: PropTypes.string,
    field: PropTypes.object,
    item: PropTypes.object,
    types: PropTypes.array,
    onDone: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { entity, field, item } = this.props
    return {
      title: _.startCase(entity),
      cancelIcon: 'chevron-left',
      saveText: item ? 'Update' : 'Add',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'id', type: 'hidden', value: item ? item.id : false },
            { name: 'is_primary', type: 'hidden', value: item ? item.is_primary : false },
            { ...field, required: true, defaultValue: item ? item[field.name] : null }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleSuccess(item) {
    this.props.onDone(item)
  }

}

export default Item
