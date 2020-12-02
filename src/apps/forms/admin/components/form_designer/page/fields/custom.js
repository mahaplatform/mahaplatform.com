import SignatureField from '../../fields/signaturefield'
import AddressField from '../../fields/addressfield'
import HiddenField from '../../fields/hiddenfield'
import MoneyField from '../../fields/moneyfield'
import CheckBoxes from '../../fields/checkboxes'
import RadioGroup from '../../fields/radiogroup'
import PhoneField from '../../fields/phonefield'
import DateField from '../../fields/datefield'
import FileField from '../../fields/filefield'
import TextField from '../../fields/textfield'
import TextArea from '../../fields/textfield'
import TimeField from '../../fields/timefield'
import DropDown from '../../fields/dropdown'
import Checkbox from '../../fields/checkbox'
import Text from '../../fields/text'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Custom extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array,
    form: PropTypes.object
  }

  _handleDragStart = this._handleDragStart.bind(this)

  render() {
    const fields = this._getFields()
    return (
      <div className="flowchart-designer-blocks">
        <p>These fields belong to the form and will not update the contact
        properties when the form is submitted</p>
        { fields.map((field, index) => (
          <div className="flowchart-designer-block" key={`field_${index}`} { ...this._getField(field) }>
            <div className="flowchart-designer-block-icon action">
              <i className={`fa fa-fw fa-${ field.icon }`} />
            </div>
            <div className="flowchart-designer-block-label">
              { field.label.toUpperCase() }
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getFields() {
    const { admin } = this.context
    return [
      { label: 'Address Field', icon: 'map-marker', type: 'addressfield', component: AddressField },
      { label: 'Checkbox', icon: 'check-square', type: 'checkbox', component: Checkbox },
      { label: 'Checkboxes', icon: 'check-square-o', type: 'checkboxes', component: CheckBoxes },
      { label: 'Date Field', icon: 'calendar', type: 'datefield', component: DateField },
      { label: 'Drop Down', icon: 'caret-square-o-down', type: 'dropdown', component: DropDown },
      { label: 'File Upload', icon: 'cloud-upload', type: 'filefield', component: FileField },
      { label: 'Hidden Field', icon: 'eye-slash', type: 'hiddenfield', component: HiddenField },
      { label: 'Instructions', icon: 'align-left', type: 'text', component: Text },
      { label: 'Money Field', icon: 'dollar', type: 'moneyfield', component: MoneyField },
      { label: 'Phone Field', icon: 'phone', type: 'phonefield', component: PhoneField },
      { label: 'Radio Group', icon: 'circle-o', type: 'radiogroup', component: RadioGroup },
      ..._.includes(admin.account.features, 'adobesign') ? [{ label: 'Singature Field', icon: 'pencil', type: 'signaturefield', component: SignatureField }] : [],
      { label: 'Text Area', icon: 'font', type: 'textarea', component: TextArea },
      { label: 'Text Field', icon: 'font', type: 'textfield', component: TextField },
      { label: 'Time Field', icon: 'clock-o', type: 'timefield', component: TimeField }
    ]
  }

  _getField(field) {
    return {
      draggable: true,
      onDragStart: this._handleDragStart.bind(this, field)
    }
  }

  _handleDragStart(field, e) {
    e.dataTransfer.dropEffect = 'all'
    e.dataTransfer.setData('field', JSON.stringify({
      type: field.type
    }))
  }

}

export default Custom
