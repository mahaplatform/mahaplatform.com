import { DragSource, DropTarget } from 'react-dnd'
import Preferences from './preferences'
import PropTypes from 'prop-types'
import Divider from './divider'
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
    active: PropTypes.object,
    blockIndex: PropTypes.number,
    config: PropTypes.object,
    editable: PropTypes.bool,
    reordering: PropTypes.bool,
    section: PropTypes.string,
    onAction: PropTypes.func,
    onHover: PropTypes.func,
    onMove: PropTypes.func,
    onReordering: PropTypes.func
  }

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource, blockIndex, config, editable, reordering } = this.props
    const Component  = this._getComponent()
    return connectDragSource(connectDropTarget(connectDragPreview(
      <div className={ this._getClass() }>
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
        { editable && !reordering &&
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
      </div>
    )))
  }

  _getClass() {
    const { active, blockIndex, section } = this.props
    const is_active = active.index !== null && active.index === blockIndex && active.section === section
    const classes = ['block']
    if(is_active) classes.push('active')
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
    const { blockIndex, section,onAction } = this.props
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


const target = {
  hover(to, monitor, component) {
    const from = monitor.getItem()
    to.onHover({
      section: from.section,
      index: from.blockIndex
    }, {
      section: to.section,
      index: to.blockIndex
    })
  },
  drop(to, monitor, component) {
    const from = monitor.getItem()
    if (from.section === to.section && from.blockIndex === to.blockIndex) return
    to.onMove({
      section: from.section,
      index: from.blockIndex
    }, {
      section: to.section,
      index: to.blockIndex
    })
    from.section = to.section
    from.blockIndex = to.blockIndex
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

Block = DragSource('ITEM', source, sourceCollector)(Block)
Block = DropTarget('ITEM', target, targetCollector)(Block)

export default Block
