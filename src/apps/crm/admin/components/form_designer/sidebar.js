import AddressField from './fields/addressfield'
import ContactField from './fields/contactfield'
import ProductField from './fields/productfield'
import MoneyField from './fields/moneyfield'
import CheckBoxes from './fields/checkboxes'
import RadioGroup from './fields/radiogroup'
import PhoneField from './fields/phonefield'
import DateField from './fields/datefield'
import FileField from './fields/filefield'
import TextField from './fields/textfield'
import TextArea from './fields/textfield'
import TimeField from './fields/timefield'
import DropDown from './fields/dropdown'
import Checkbox from './fields/checkbox'
import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Text from './fields/text'
import Page from './page'
import React from 'react'
import _ from 'lodash'

class Sidebar extends React.Component {

  static propTypes = {
    active: PropTypes.number,
    cid: PropTypes.string,
    changes: PropTypes.number,
    config: PropTypes.object,
    endpoint: PropTypes.string,
    fields: PropTypes.array,
    form: PropTypes.object,
    program: PropTypes.object,
    status: PropTypes.string,
    onAddSection: PropTypes.func,
    onDeleteSection: PropTypes.func,
    onMoveSection: PropTypes.func,
    onEdit: PropTypes.func,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleDone = this._handleDone.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleReplace = this._handleReplace.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Page, this._getPage())
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props
    if(active !== prevProps.active) {
      if(active !== null) this._handleEdit(prevProps.active !== null)
      if(active === null) this._handlePop()
    }
  }

  _getFields() {
    const { form } = this.props
    const { program } = form
    const fields = [
      { label: 'Address', icon: 'map-marker', type: 'addressfield', component: AddressField },
      { label: 'Checkboxes', icon: 'check-square-o', type: 'checkboxes', component: CheckBoxes },
      { label: 'Confirmation', icon: 'check-square', type: 'checkbox', component: Checkbox },
      { label: 'Contactfield', icon: 'user', type: 'contactfield', component: ContactField },
      { label: 'Date', icon: 'calendar', type: 'datefield', component: DateField },
      { label: 'Dropdown', icon: 'caret-square-o-down', type: 'dropdown', component: DropDown },
      { label: 'File Upload', icon: 'cloud-upload', type: 'filefield', component: FileField },
      { label: 'Instructions', icon: 'align-left', type: 'text', component: Text },
      { label: 'Money', icon: 'dollar', type: 'moneyfield', component: MoneyField },
      { label: 'Multiple Choice', icon: 'circle-o', type: 'radiogroup', component: RadioGroup },
      { label: 'Multi Line Text', icon: 'font', type: 'textarea', component: TextArea },
      { label: 'Phone', icon: 'phone', type: 'phonefield', component: PhoneField },
      { label: 'Products', icon: 'shopping-bag', type: 'productfield', component: ProductField },
      { label: 'Single Line Text', icon: 'font', type: 'textfield', component: TextField },
      { label: 'Time', icon: 'clock-o', type: 'timefield', component: TimeField }
    ]
    return fields.filter(field => {
      return field.type !== 'productfield' || _.get(program, 'merchant.status') === 'active'
    })
  }

  _getField() {
    const { active, config, fields } = this.props
    const key = `fields[${active}]`
    return {
      config: {
        code: _.random(100000000, 999999999).toString(36),
        ..._.get(config, key)
      },
      fields,
      onDone: this._handleDone,
      onUpdate: this._handleUpdate.bind(this, key)
    }
  }

  _getPage() {
    const { cid, changes, endpoint, form, status, onSave } = this.props
    return {
      cid,
      changes,
      endpoint,
      fields: this._getFields(),
      form,
      status,
      onSave,
      onUpdate: this._handleUpdate,
      onPop: this._handlePop,
      onPush: this._handlePush
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleDone() {
    this.props.onEdit(null, null)
  }

  _handleEdit(replace) {
    const { active } = this.props
    const fields = this._getFields()
    const config = this.props.config.fields[active]
    const { type } = config
    const field = _.find(fields, { type })
    const push = replace ? this._handleReplace : this._handlePush
    push(field.component, this._getField())
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
  }

  _handleReplace(component, props) {
    this._handlePop()
    setTimeout(this._handlePush.bind(this, component, props), 300)
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

  _handleUpdate(key, value) {
    const { config } = this.props
    this.props.onUpdate(key, {
      ..._.get(config, key),
      ...value
    })
  }

}

export default Sidebar
