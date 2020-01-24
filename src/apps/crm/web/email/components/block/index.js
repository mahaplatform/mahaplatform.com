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

class Block extends React.Component {

  static propTypes = {
    active: PropTypes.object,
    blockIndex: PropTypes.number,
    config: PropTypes.object,
    sectionIndex: PropTypes.number,
    onAction: PropTypes.func
  }

  render() {
    const Component  = this._getComponent()
    return (
      <div className={ this._getClass() }>
        <Component { ...this._getBlock() } />
        <div className="block-highlight" />
        <div className="block-actions">
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
    )
  }

  _getClass() {
    const { active, blockIndex, sectionIndex } = this.props
    const is_active = active && active.section === sectionIndex && active.block === blockIndex
    const classes=['block']
    if(is_active) classes.push('active')
    return classes.join(' ')
  }

  _getBlock() {
    const { blockIndex, sectionIndex, config  } = this.props
    return {
      blockIndex,
      sectionIndex,
      config
    }
  }

  _getComponent() {
    const { config } = this.props
    if(config.type === 'button') return Button
    if(config.type === 'text') return Text
    if(config.type === 'divider') return Divider
    if(config.type === 'images') return Images
    if(config.type === 'image') return Image
    if(config.type === 'video') return Video
    if(config.type === 'share') return Share
    if(config.type === 'follow') return Follow
  }

  _handleAction(action) {
    const { sectionIndex, blockIndex, onAction } = this.props
    onAction(action, {
      section: sectionIndex,
      block: blockIndex
    })
  }

}

export default Block
