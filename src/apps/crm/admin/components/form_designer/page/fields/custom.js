import AddressField from '../../fields/addressfield'
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
import PropTypes from 'prop-types'
import Text from '../../fields/text'
import React from 'react'

class Custom extends React.Component {

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
        { fields.map((field, index) => (
          <div className="flowchart-designer-block" key={`field_${index}`} { ...this._getField(field) }>
            <div className="flowchart-designer-block-icon action">
              <i className={`fa fa-fw fa-${ field.icon }`} />
            </div>
            <div className="flowchart-designer-block-label">
              { field.label }
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getFields() {
    return [
      { label: 'Address', icon: 'map-marker', type: 'addressfield', component: AddressField },
      { label: 'Checkbox', icon: 'check-square', type: 'checkbox', component: Checkbox },
      { label: 'Checkboxes', icon: 'check-square-o', type: 'checkboxes', component: CheckBoxes },
      { label: 'Date', icon: 'calendar', type: 'datefield', component: DateField },
      { label: 'Drop Down', icon: 'caret-square-o-down', type: 'dropdown', component: DropDown },
      { label: 'File Upload', icon: 'cloud-upload', type: 'filefield', component: FileField },
      { label: 'Instructions', icon: 'align-left', type: 'text', component: Text },
      { label: 'Money', icon: 'dollar', type: 'moneyfield', component: MoneyField },
      { label: 'Phone', icon: 'phone', type: 'phonefield', component: PhoneField },
      { label: 'Radio Group', icon: 'circle-o', type: 'radiogroup', component: RadioGroup },
      { label: 'Text Area', icon: 'font', type: 'textarea', component: TextArea },
      { label: 'Text Field', icon: 'font', type: 'textfield', component: TextField },
      { label: 'Time', icon: 'clock-o', type: 'timefield', component: TimeField }
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
    e.dataTransfer.setData('field', {
      type: field.type
    })
  }

}

export default Custom
