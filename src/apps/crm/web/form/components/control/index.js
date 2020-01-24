import ProductField from '../../../embedded/components/form/fields/productfield'
import Checkboxes from '../../../embedded/components/form/fields/checkboxes'
import RadioGroup from '../../../embedded/components/form/fields/radiogroup'
import PhoneField from '../../../embedded/components/form/fields/phonefield'
import FileField from '../../../embedded/components/form/fields/filefield'
import TextField from '../../../embedded/components/form/fields/textfield'
import DateField from '../../../embedded/components/form/fields/datefield'
import TimeField from '../../../embedded/components/form/fields/timefield'
import TextArea from '../../../embedded/components/form/fields/textarea'
import Dropdown from '../../../embedded/components/form/fields/dropdown'
import Text from '../../../embedded/components/form/fields/text'
import PropTypes from 'prop-types'
import React from 'react'

class Control extends React.Component {

  static propTypes = {
    field: PropTypes.object
  }

  render() {
    const Component  = this._getComponent()
    return <Component { ...this._getField() } />
  }

  _getField() {
    const { field  } = this.props
    return {
      field
    }
  }

  _getComponent() {
    const { field } = this.props
    if(field.type === 'checkboxes') return Checkboxes
    if(field.type === 'datefield') return DateField
    if(field.type === 'dropdown') return Dropdown
    if(field.type === 'filefield') return FileField
    if(field.type === 'phonefield') return PhoneField
    if(field.type === 'productfield') return ProductField
    if(field.type === 'radiogroup') return RadioGroup
    if(field.type === 'text') return Text
    if(field.type === 'textfield') return TextField
    if(field.type === 'textarea') return TextArea
    if(field.type === 'timefield') return TimeField
  }

}

export default Control
