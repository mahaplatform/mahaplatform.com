import { Preview } from 'maha-admin'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Canvas from './canvas'
import React from 'react'

import CheckBoxes from './fields/checkboxes'
import DropDown from './fields/dropdown'
import RadioGroup from './fields/radiogroup'
import Text from './fields/text'
import TextField from './fields/textfield'

class FormDesigner extends React.PureComponent {

  static propTypes = {
    active: PropTypes.number,
    changes: PropTypes.number,
    cid: PropTypes.string,
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    sidebar: PropTypes.bool,
    onAdd: PropTypes.func,
    onClone: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { sidebar } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="designer-main">
          <div className="designer-toggle" onClick={ this._handleToggle }>
            { sidebar ?
              <i className="fa fa-times" /> :
              <i className="fa fa-chevron-left" />
            }
          </div>
          <Preview>
            <Canvas { ...this._getCanvas() } />
          </Preview>
        </div>
        { sidebar &&
          <div className="designer-sidebar">
            <Sidebar { ...this._getSidebar() } />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const defaultValue = this.props.defaultValue || this._getDefault()
    this.props.onSet(defaultValue)
  }

  _getCanvas() {
    const { config, onClone, onEdit, onRemove } = this.props
    return {
      config,
      onAdd: this._handleAdd,
      onClone,
      onEdit,
      onRemove
    }
  }

  _getClass() {
    const { sidebar } = this.props
    const classes = ['designer']
    if(sidebar) classes.push('expanded')
    return classes.join(' ')
  }

  _getDefault() {
    return {}
  }

  _getFields() {
    return [
      { label: 'Text', icon: 'align-left', type: 'text', component: Text },
      { label: 'Textfield', icon: 'font', type: 'textfield', component: TextField },
      { label: 'Radio Group', icon: 'check-circle', type: 'radiogroup', component: RadioGroup },
      { label: 'Checkboxes', icon: 'check-square', type: 'checkboxes', component: CheckBoxes },
      { label: 'Dropdown', icon: 'caret-square-o-down', type: 'dropdown', component: DropDown },
      { label: 'File Upload', icon: 'cloud-upload', type: 'fileupload' },
      { label: 'Datefield', icon: 'calendar', type: 'datefield' },
      { label: 'Timefield', icon: 'clock-o', type: 'timefield' },
      { label: 'Productfield', icon: 'shopping-bag', type: 'productfield' },
      { label: 'Paymentfield', icon: 'dollar', type: 'paymentfield' }
    ]
  }

  _getSidebar() {
    const { active, cid, config, onEdit, onSave, onUpdate } = this.props
    return {
      active,
      cid,
      fields: this._getFields(),
      config,
      onEdit,
      onSave,
      onUpdate
    }
  }

  _handleAdd(index, type) {
    this.props.onAdd(index, { type })
  }

  _handleToggle() {
    this.props.onToggle()
  }

}

export default FormDesigner
