import ContactField from '../../fields/contactfield'
import Field from '@admin/components/fields/new'
import PropTypes from 'prop-types'
import { Button } from '@admin'
import React from 'react'
import _ from 'lodash'

class Contact extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array,
    form: PropTypes.object,
    program: PropTypes.object
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleDragStart = this._handleDragStart.bind(this)

  render() {
    const fields = this._getFields()
    const { program } = this.props
    return (
      <div className="flowchart-designer-blocks">
        <p>These fields belong to the contact and will update the contact
        properties when the form is submitted</p>
        { fields.map((field, index) => (
          <div className="flowchart-designer-block" key={`field_${index}`} { ...this._getField(field) }>
            <div className="flowchart-designer-block-icon action">
              <i className={`fa fa-fw fa-${ field.icon }`} />
            </div>
            <div className="flowchart-designer-block-label">
              { field.label } ({field.field.contactfield.type.toUpperCase()})
            </div>
          </div>
        )) }
        { program.access_type === 'manage' &&
          <Button { ...this._getAdd() } />
        }
      </div>
    )
  }

  _getAdd() {
    return {
      label: 'Add Contact Property',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getFields() {
    const { config, fields } = this.props
    const used = config.fields.reduce((used, field) => [
      ...used,
      ...field.type === 'contactfield' ? [_.get(field, 'contactfield.name')] : []
    ], [])
    return fields.filter(field => {
      return !_.includes(used, field.field.contactfield.name)
    }).map(field => ({
      label: field.label,
      icon: this._getIcon(field.field.contactfield.type),
      type: 'contactfield',
      field: {
        ...field.field.contactfield || {},
        ...field.field
      },
      component: ContactField
    }))
  }

  _getIcon(type) {
    if(type === 'textfield') return 'font'
    if(type === 'textarea') return 'font'
    if(type === 'emailfield') return 'envelope'
    if(type === 'phonefield') return 'phone'
    if(type === 'addressfield') return 'map-marker'
    if(type === 'datefield') return 'calendar'
    if(type === 'checkbox') return 'check-square'
    if(type === 'checkboxgroup') return 'check-square-o'
    if(type === 'checkboxes') return 'check-square-o'
    if(type === 'radiogroup') return 'circle-o'
    if(type === 'filefield') return 'cloud-upload'
    if(type === 'dropdown') return 'caret-square-o-down'
    if(type === 'moneyfield') return 'dollar'
    return 'user'
  }

  _getField(field) {
    return {
      draggable: true,
      onDragStart: this._handleDragStart.bind(this, field)
    }
  }

  _handleAdd() {
    const { program } = this.props
    this.context.form.push(<Field action={`/api/admin/crm_programs/${program.id}/fields`} />)
  }

  _handleDragStart(field, e) {
    e.dataTransfer.dropEffect = 'all'
    e.dataTransfer.setData('field', JSON.stringify({
      ...field.field,
      type: 'contactfield'
    }))
  }

}

export default Contact
