// import { DragSource, DropTarget } from 'react-dnd'
import { TextField } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Section extends React.Component {

  static propTypes = {
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
    index: PropTypes.number,
    section: PropTypes.object,
    onDeleteSection: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleDelete = this._handleDelete.bind(this)
  _handleRename = this._handleRename.bind(this)

  render() {
    // const { connectDragSource, connectDropTarget } = this.props
    return (
      <div className="email-designer-layout-section">
        <div className="email-designer-layout-section-handle">
          <i className="fa fa-bars" />
        </div>
        <div className="email-designer-layout-section-label">
          <TextField { ...this._getTextField() } />
        </div>
        <div className="email-designer-layout-section-action" onClick={ this._handleDelete }>
          <i className="fa fa-trash-o" />
        </div>
      </div>
    )
  }

  _getTextField() {
    const { section } = this.props
    return {
      defaultValue: section.label,
      placeholder: 'Enter a name',
      onChange: this._handleRename
    }
  }

  _handleDelete() {
    const { index } = this.props
    this.props.onDeleteSection(index)
  }

  _handleRename(label) {
    const { section, index } = this.props
    this.props.onUpdate(`sections[${index}]`, {
      section,
      label
    })
  }

}
//
// const source = {
//   beginDrag: (props) => ({
//     index: props.index,
//     label: props.label
//   })
// }
//
// const target = {
//   hover: (props, monitor, component) => {
//     const dragIndex = monitor.getItem().index
//     const hoverIndex = props.index
//     if (dragIndex === hoverIndex) return
//     props.onMoveSection(dragIndex, hoverIndex)
//     monitor.getItem().index = hoverIndex
//   }
// }
//
// const sourceCollector = (connect, monitor) => ({
//   connectDragSource: connect.dragSource(),
//   connectDragPreview: connect.dragPreview(),
//   isDragging: monitor.isDragging()
// })
//
// const targetCollector = (connect) => ({
//   connectDropTarget: connect.dropTarget()
// })
//
// Section = DragSource('ITEM', source, sourceCollector)(Section)
//
// Section = DropTarget('ITEM', target, targetCollector)(Section)

export default Section
