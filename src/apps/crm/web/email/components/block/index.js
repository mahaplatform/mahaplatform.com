import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import Preferences from './preferences'
import PropTypes from 'prop-types'
import Divider from './divider'
import Target from '../target'
import Button from './button'
import Images from './images'
import Follow from './follow'
import Image from './image'
import Share from './share'
import Video from './video'
import Text from './text'
import React from 'react'
import Web from './web'

class Block extends React.Component {

  static propTypes = {
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    blockIndex: PropTypes.number,
    config: PropTypes.object,
    editable: PropTypes.bool,
    isActive: PropTypes.bool,
    isMoving: PropTypes.bool,
    movingPosition: PropTypes.string,
    reordering: PropTypes.bool,
    section: PropTypes.string,
    onAction: PropTypes.func,
    onHover: PropTypes.func,
    onMove: PropTypes.func,
    onReordering: PropTypes.func
  }

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource, blockIndex, config, editable, isMoving, movingPosition, reordering } = this.props
    const Component  = this._getComponent()
    return connectDragSource(connectDropTarget(connectDragPreview(
      <div className={ this._getClass() }>
        { editable && isMoving && movingPosition === 'before' &&
          <Target />
        }
        <table className={`row collapse block-${ blockIndex } ${ config.type }-block block`}>
          <tbody>
            <tr>
              <td className="small-12 large-12">
                <table className="block-container">
                  <tbody>
                    <tr>
                      <td className="block-container-cell">
                        <Component { ...this._getBlock() } />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        { editable && (!reordering || isMoving) &&
          <div className="block-highlight" />
        }
        { editable && !reordering &&
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
        }
        { editable && isMoving && movingPosition === 'after' &&
          <Target />
        }
      </div>
    )))
  }

  _getClass() {
    const { isActive, isMoving } = this.props
    const classes = ['block']
    if(isActive || isMoving) classes.push('active')
    return classes.join(' ')
  }

  _getBlock() {
    const { blockIndex, config  } = this.props
    return {
      blockIndex,
      config
    }
  }

  _getComponent() {
    const { config } = this.props
    if(config.type === 'button') return Button
    if(config.type === 'divider') return Divider
    if(config.type === 'follow') return Follow
    if(config.type === 'image') return Image
    if(config.type === 'images') return Images
    if(config.type === 'preferences') return Preferences
    if(config.type === 'share') return Share
    if(config.type === 'text') return Text
    if(config.type === 'video') return Video
    if(config.type === 'web') return Web
  }

  _handleAction(action) {
    const { blockIndex, section, onAction } = this.props
    onAction(action, {
      section,
      block: blockIndex
    })
  }

}

const source = {
  beginDrag: (props) => {
    props.onReordering(true)
    return {
      blockIndex: props.blockIndex,
      section: props.section,
      onHover: props.onHover,
      onMove: props.onMove
    }
  },
  endDrag: (props) => {
    props.onReordering(false)
  }
}

const getPosition = (monitor, component) => {
  const targetBoundingRect = findDOMNode(component).getBoundingClientRect()
  const veritcalMiddle = targetBoundingRect.top + (targetBoundingRect.bottom - targetBoundingRect.top) / 2
  const clientOffset = monitor.getClientOffset()
  return clientOffset.y >= veritcalMiddle ? 'after' : 'before'
}

const target = {
  hover(to, monitor, component) {
    const from = monitor.getItem()
    const position = getPosition(monitor, component)
    to.onHover({
      section: from.section,
      index: from.blockIndex
    }, {
      section: to.section,
      index: to.blockIndex
    }, position)
  },
  drop(to, monitor, component) {
    const from = monitor.getItem()
    const position = getPosition(monitor, component)
    const offset = getOffset(from, to, position)
    const toindex = to.blockIndex + offset
    if(from.section === to.section && from.blockIndex === toindex) return
    to.onMove({
      section: from.section,
      index: from.blockIndex
    }, {
      section: to.section,
      index: toindex
    })
  }
}

const getOffset = (from, to, position) => {
  if(from.section !== to.section) return position === 'before' ? 0 : 1
  if(from.blockIndex < to.blockIndex) return position === 'before' ? -1 : 0
  if(from.blockIndex > to.blockIndex) return position === 'after' ? 1 : 0
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

Block = DragSource('ITEM', source, sourceCollector)(Block)
Block = DropTarget('ITEM', target, targetCollector)(Block)

export default Block
