import ContactFieldItem from '../../contactfield'
import { Container, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class ContactField extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array,
    onDone: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    config: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
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
      // onChangeField: this._handleChangeField,
      onCancel: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Field', name: 'contactfield', type: ContactFieldItem, options: fields, defaultValue: config.contactfield },
            ...this._getField()
          ]
        }
      ]
    }
  }

  _getField() {
    const { config } = this.state
    if(config.contactfield === null) return []
    return [
      { label: 'Label', name: 'label', type: 'textfield', placeholder: 'Enter a label', defaultValue: config.label },
      { label: 'Token', name: 'token', type: 'textfield', disabled: true, defaultValue: config.token },
      { label: 'Instructions', name: 'instructions', type: 'textarea', rows: 2, placeholder: 'Enter instructions', defaultValue: config.instructions },
      { label: 'Required', name: 'required', type: 'checkbox', defaultValue: config.required }
    ]
  }

  _getDefault() {
    return {
      contactfield: null,
      label: '',
      token: '',
      instructions: '',
      required: false
    }
  }

  _handleChange(config) {
    config.label = config.label || config.contactfield.label
    config.token = config.label ? config.label.replace(/[^A-Za-z0-9\s]+/g, '').replace(/[\s]+/g, '_').toLowerCase() : ''
    this.setState({
      config: {
        ...this.state.config,
        ...config
      }
    })
  }

  _handleChangeField(key, value) {
    if(key === 'contactfield') {
      this.setState({
        config: {
          ...this.state.config,
          contactfield: value,
          label: value.label
        }
      })
    }

  }

  _handleDone() {
    this.props.onDone()
  }

}

const mapResources = (props, context) => ({
  fields: '/api/admin/crm/forms/fields'
})

export default Container(mapResources)(ContactField)
