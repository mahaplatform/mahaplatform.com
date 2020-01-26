import ContactFieldItem from '../../contactfield'
import { Container, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class ContactField extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.object,
    onDone: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    config: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    if(!this.state.config) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: {
        ...this._getDefault(),
        ...this.props.config
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { config } = this.state
    if(!_.isEqual(config, prevState.config)) {
      this.props.onUpdate(config)
    }
  }

  _getForm() {
    const { fields } = this.props
    const { config } = this.state
    return {
      title: 'Contact Field',
      onChange: this._handleChange,
      onCancel: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Label', name: 'label', type: 'textfield', placeholder: 'Enter a label', defaultValue: config.label },
            { label: 'Instructions', name: 'instructions', type: 'textarea', rows: 2, placeholder: 'Enter instructions', defaultValue: config.instructions },
            { label: 'Required', name: 'required', type: 'checkbox', defaultValue: config.required },
            { label: 'Field', name: 'field_id', type: ContactFieldItem, options: fields, value: 'id', text: 'label', placeholder: 'Choose a field', defaultValue: config.field_id }
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      label: '',
      instructions: '',
      required: false
    }
  }

  _handleChange(config) {
    this.setState({
      config: {
        ...this.state.config,
        ...config
      }
    })
  }

  _handleDone() {
    this.props.onDone()
  }

}

const mapResources = (props, context) => ({
  fields: '/api/admin/crm/forms/fields'
})

export default Container(mapResources)(ContactField)
