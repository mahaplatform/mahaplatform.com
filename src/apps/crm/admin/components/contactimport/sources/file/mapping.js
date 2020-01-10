import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Mapping extends React.PureComponent {

  static propTypes = {
    mapping: PropTypes.object,
    options: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { mapping, options } = this.props
    return {
      title: 'Map Field',
      cancelIcon: 'chevron-left',
      onCancel: this._handleCancel,
      onSubmit: this._handleSubmit,
      sections: [
        {
          fields: [
            { label: 'Field', name: 'field', type: 'dropdown', required: true, options, defaultValue: mapping.field },
            { label: 'Type', name: 'type', type: 'dropdown', required: true, options: this._getTypes(), defaultValue: mapping.field }
          ]
        }
      ]
    }
  }

  _getTypes() {
    return [
      {
        value: 'text',
        text: 'Text'
      }, {
        value: 'upload',
        text: 'Image or file upload'
      }
    ]
  }

  _handleCancel() {
    this.props.onBack()
  }

  _handleSubmit(mapping) {
    this.props.onDone(mapping)
  }

}

export default Mapping
