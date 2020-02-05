import { DragLayer } from 'react-dnd'
import PropTypes from 'prop-types'
import React from 'react'

class CustomDragLayer extends React.Component {

  static propTypes = {
    clientOffset: PropTypes.object,
    isDragging: PropTypes.bool,
    item: PropTypes.object
  }

  render() {
    const { isDragging, item } = this.props
    if(!isDragging) return null
    return (
      <div className="flowchart-drag-layer" style={ this._getStyle() }>
        <div className={`flowchart-box-icon flowchart-designer-icon-${item.type}`}>
          <i className={`fa fa-${item.icon}`} />
        </div>
      </div>
    )
  }

  _getStyle() {
    const { clientOffset } = this.props
    if(!clientOffset) return {}
    const x = clientOffset.x - 50
    const y = clientOffset.y - 50
    const transform = `translate(${x}px, ${y}px)`
    return {
      transform,
      WebkitTransform: transform
    }
  }

}

const collect = (monitor) => ({
  clientOffset: monitor.getClientOffset(),
  isDragging: monitor.isDragging(),
  item: monitor.getItem(),
  itemType: monitor.getItemType()
})

export default DragLayer(collect)(CustomDragLayer)
