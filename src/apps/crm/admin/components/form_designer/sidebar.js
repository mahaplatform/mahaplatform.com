import ContactField from './fields/contactfield'
import ProductField from './fields/productfield'
import CheckBoxes from './fields/checkboxes'
import RadioGroup from './fields/radiogroup'
import DateField from './fields/datefield'
import FileField from './fields/filefield'
import TextField from './fields/textfield'
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
    config: PropTypes.object,
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
    return [
      { label: 'Contactfield', icon: 'user', type: 'contactfield', component: ContactField },
      { label: 'Textfield', icon: 'font', type: 'textfield', component: TextField },
      { label: 'Dropdown', icon: 'caret-square-o-down', type: 'dropdown', component: DropDown },
      { label: 'Radio Group', icon: 'check-circle', type: 'radiogroup', component: RadioGroup },
      { label: 'Checkboxes', icon: 'check-square', type: 'checkboxes', component: CheckBoxes },
      { label: 'Checkbox', icon: 'check-square', type: 'checkbox', component: Checkbox },
      { label: 'File Upload', icon: 'cloud-upload', type: 'filefield', component: FileField },
      { label: 'Datefield', icon: 'calendar', type: 'datefield', component: DateField },
      { label: 'Timefield', icon: 'clock-o', type: 'timefield', component: TimeField },
      { label: 'Productfield', icon: 'shopping-bag', type: 'productfield', component: ProductField },
      { label: 'Text', icon: 'align-left', type: 'text', component: Text }
    ]
  }

  _getField() {
    const { active, config } = this.props
    const key = `fields[${active}]`
    return {
      config: {
        name: _.random(100000000, 999999999).toString(36),
        ..._.get(config, key)
      },
      onDone: this._handleDone,
      onUpdate: this._handleUpdate.bind(this, key)
    }
  }

  _getPage() {
    const { cid, onSave } = this.props
    return {
      cid,
      fields: this._getFields(),
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
