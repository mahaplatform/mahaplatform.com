import { AddressField, Checkboxes, RadioGroup, PhoneField, FileField, TextField, DateField, TimeField, TextArea, DropDown, Checkbox, Text } from 'maha-client'
import DonationField from '../../embedded/components/form/fields/donationfield'
import ProductField from '../../embedded/components/form/fields/productfield'
import { DragSource, DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Field extends React.Component {

  static propTypes = {
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    active: PropTypes.number,
    config: PropTypes.object,
    field: PropTypes.object,
    index: PropTypes.number,
    isDragging: PropTypes.bool,
    onAction: PropTypes.func,
    onMove: PropTypes.func,
    onReordering: PropTypes.func
  }

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource, field } = this.props
    if(Object.keys(field).length === 1) return null
    const Component  = this._getComponent(field)
    const { label, instructions } = field
    return connectDragSource(connectDropTarget(connectDragPreview(
      <div className={ this._getClass() }>
        <div className={ this._getFieldClass() }>
          { label && <label>{ label }</label> }
          { instructions &&
            <div className="field-instructions" dangerouslySetInnerHTML={{ __html: instructions }} />
          }
          <Component { ...this._getField() } />
        </div>
        <div className="block-highlight" />
        <div className="block-actions">
          <div className="block-action">
            <i className="fa fa-bars"></i>
          </div>
          <div className="block-spacer"></div>
          <div className="block-action" onClick={ this._handleAction.bind(this, 'edit') }>
            <i className="fa fa-pencil"></i>
          </div>
          <div className="block-action" onClick={ this._handleAction.bind(this, 'clone') }>
            <i className="fa fa-copy"></i>
          </div>
          <div className="block-action" onClick={ this._handleAction.bind(this, 'remove') }>
            <i className="fa fa-trash"></i>
          </div>
        </div>
      </div>
    )))
  }

  _getClass() {
    const { active, index } = this.props
    const is_active = active !== null && active === index
    const classes = ['block']
    if(is_active) classes.push('active')
    return classes.join(' ')
  }

  _getComponent(field) {
    if(field.type === 'contactfield' && field.contactfield) return this._getComponent(field.contactfield)
    if(field.type === 'addressfield') return AddressField
    if(field.type === 'checkboxes') return Checkboxes
    if(field.type === 'checkbox') return Checkbox
    if(field.type === 'datefield') return DateField
    if(field.type === 'donationfield') return DonationField
    if(field.type === 'dropdown') return DropDown
    if(field.type === 'filefield') return FileField
    if(field.type === 'phonefield') return PhoneField
    if(field.type === 'productfield') return ProductField
    if(field.type === 'radiogroup') return RadioGroup
    if(field.type === 'text') return Text
    if(field.type === 'textarea') return TextArea
    if(field.type === 'timefield') return TimeField
    return TextField
  }

  _getField() {
    const field = {
      ...this.props.field.contactfield || {},
      ...this.props.field
    }

    return {
      ...field,
      name: _.get(field, 'name.value')
    }
  }

  _getFieldClass() {
    const { field, index } = this.props
    const classes = ['field',`field-${index}`]
    if(field.required) classes.push('required')
    return classes.join(' ')
  }

  _handleAction(action) {
    const { index, onAction } = this.props
    onAction(action, { index })
  }

}

const source = {
  beginDrag: (props) => {
    props.onReordering(true)
    return {
      index: props.index,
      onMove: props.onMove
    }
  },
  endDrag: (props) => {
    props.onReordering(false)
  }
}

const target = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    if (dragIndex === hoverIndex) return
    props.onMove(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  }
}

const sourceCollector = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

const targetCollector = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

Field = DragSource('ITEM', source, sourceCollector)(Field)
Field = DropTarget('ITEM', target, targetCollector)(Field)

export default Field
