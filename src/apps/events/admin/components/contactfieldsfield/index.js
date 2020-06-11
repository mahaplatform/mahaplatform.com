import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'
import New from './new'
import _ from 'lodash'

class ContactFieldsField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    fields: PropTypes.array,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    fields: null
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleBack = this._handleBack.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { fields } = this.state
    if(!fields) return null
    return (
      <div className="contactfieldsfield">
        <div className="contactfieldsfield-field">
          <div className="contactfieldsfield-field-label">
            First Name <span>(textfield)</span>
          </div>
        </div>
        <div className="contactfieldsfield-field">
          <div className="contactfieldsfield-field-label">
            Last Name <span>(textfield)</span>
          </div>
        </div>
        <div className="contactfieldsfield-field">
          <div className="contactfieldsfield-field-label">
            Email <span>(emailfield)</span>
          </div>
        </div>
        { fields.map((field, index) => (
          <div className="contactfieldsfield-field" key={`field_${index}`}>
            <div className="contactfieldsfield-field-label">
              { field.name.value } <span>({ this._getType(field) })</span>
            </div>
            <div className="contactfieldsfield-field-action" onClick={ this._handleEdit.bind(this, field, index)}>
              <i className="fa fa-pencil" />
            </div>
            <div className="contactfieldsfield-field-action" onClick={ this._handleRemove.bind(this, index)}>
              <i className="fa fa-times" />
            </div>
          </div>
        ))}
        <div className="contactfieldsfield-add">
          <Button { ...this._getButton() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    this.setState(defaultValue || { fields: [] })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { fields } = this.state
    if(!_.isEqual(fields, prevState.fields)) {
      this._handleChange()
    }
  }

  _getAvailable() {
    const { fields } = this.state
    const contactfields = fields.filter(field => {
      return field.type === 'contactfield'
    }).map(field => {
      return field.contactfield.name
    })
    const available = [
      { label: 'Contact', fields: [
        { label: 'Phone', name: 'phone', type: 'phonefield' },
        { label: 'Address', name: 'address', type: 'addressfield' },
        { label: 'Birthday', name: 'birthday', type: 'textfield' },
        { label: 'Spouse', name: 'spouse', type: 'textfield' }
      ] },
      ...this.props.fields.map(group => ({
        label: group.label,
        fields: group.fields.map(field => ({
          code: field.code,
          label: field.label,
          name: `values.${field.code}`,
          type: field.type,
          instructions: field.instructions,
          config: field.config
        }))
      })),
      { label: 'Consent', fields: [
        { label: 'Email Consent', name: 'consent.email', type: 'checkbox', prompt: '<p>Please send me emails</p>' },
        ..._.includes(contactfields, 'phone') ? [
          { label: 'SMS Consent', name: 'consent.sms', type: 'checkbox', prompt: '<p>Please send me text messages</p>' },
          { label: 'Voice Consent', name: 'consent.voice', type: 'checkbox', prompt: '<p>Please call me</p>' }
        ] : []
      ] }
    ]
    return available.map(group => ({
      ...group,
      fields: group.fields.filter(field => {
        return _.find(fields, {
          contactfield: {
            name: field.name
          }
        }) === undefined
      })
    })).filter(group => {
      return group.fields.length > 0
    })
  }

  _getButton() {
    return {
      label: 'Add field',
      className: 'link',
      handler: this._handleNew
    }
  }

  _getEdit(field, index) {
    return {
      field,
      fields: this._getAvailable(),
      onBack: this._handleBack,
      onDone: this._handleUpdate.bind(this, index)
    }
  }

  _getNew() {
    return {
      fields: this._getAvailable(),
      onBack: this._handleBack,
      onDone: this._handleAdd
    }
  }

  _getType(field) {
    return field.contactfield ? field.contactfield.type: field.type
  }

  _handleAdd(field) {
    this.setState({
      fields: [
        ...this.state.fields,
        field
      ]
    })
    this.context.form.pop()
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChange() {
    const { fields } = this.state
    this.props.onChange({ fields })
  }

  _handleEdit(field, index) {
    this.context.form.push(Edit, this._getEdit(field, index))
  }

  _handleNew() {
    this.context.form.push(New, this._getNew())
  }

  _handleRemove(index) {
    this.setState({
      fields: this.state.fields.filter((field, i) => {
        return i !== index
      })
    })
  }

  _handleUpdate(index, newfield) {
    this.setState({
      fields: this.state.fields.map((field, i) => {
        return i === index ? newfield : field
      })
    })
    this.context.form.pop()
  }

}

export default ContactFieldsField
