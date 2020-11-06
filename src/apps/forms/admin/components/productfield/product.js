import { DragSource, DropTarget } from 'react-dnd'
import { Button } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'

class Product extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    product: PropTypes.object,
    onRemove: PropTypes.func,
    onReorder: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleEdit = this._handleEdit.bind(this)

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource, product } = this.props
    return connectDragSource(connectDropTarget(connectDragPreview(
      <div className="crm-productfield-product">
        <div className="crm-productfield-product-handle">
          <i className="fa fa-bars" />
        </div>
        <div className="crm-productfield-product-label">
          { product.description } { product.is_sold_out &&
            <span className="alert">SOLD OUT</span>
          }
        </div>
        <Button { ...this._getEditButton() } />
        <Button { ...this._getRemoveButton() } />
      </div>
    )))
  }

  _getEdit() {
    const { product, onUpdate } = this.props
    return {
      product,
      onDone: onUpdate
    }
  }

  _getEditButton() {
    return {
      icon: 'pencil',
      className: 'crm-productfield-product-remove',
      handler: this._handleEdit
    }
  }

  _getRemoveButton() {
    const { onRemove } = this.props
    return {
      icon: 'times',
      className: 'crm-productfield-product-remove',
      confirm: 'Are you sure you want to remove this product?',
      handler: onRemove
    }
  }

  _handleEdit() {
    this.context.form.push(<Edit { ...this._getEdit() } />)
  }

}

const source = {
  beginDrag: (props) => ({
    index: props.index,
    onReorder: props.onReorder
  }),
  endDrag: (props, monitor, component) => {
    const source = monitor.getItem()
    const target = monitor.getDropResult()
    if(!target) return
    source.onReorder(source.index, target.index)
  }
}

const target = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    if (dragIndex === hoverIndex) return
    props.onReorder(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  },
  drop: (props, monitor, component) => ({
    index: props.index
  })
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

Product = DragSource('ITEM', source, sourceCollector)(Product)
Product = DropTarget('ITEM', target, targetCollector)(Product)

export default Product
