import PropTypes from 'prop-types'
import Divider from './divider'
import Button from './button'
import Footer from './footer'
import Images from './images'
import Follow from './follow'
import Share from './share'
import Video from './video'
import Text from './text'
import React from 'react'
import Code from './code'

class Block extends React.Component {

  static propTypes = {
    block: PropTypes.object,
    config: PropTypes.object,
    onDone: PropTypes.func,
    onUpdate: PropTypes.func
  }

  render() {
    const Component  = this._getComponent()
    return <Component { ...this._getBlock() } />
  }

  _getBlock() {
    const { config, onDone, onUpdate } = this.props
    return {
      config,
      onDone,
      onUpdate
    }
  }

  _getComponent() {
    const { block } = this.props
    if(block.type === 'button') return Button
    if(block.type === 'text') return Text
    if(block.type === 'divider') return Divider
    if(block.type === 'images') return Images
    if(block.type === 'footer') return Footer
    if(block.type === 'video') return Video
    if(block.type === 'code') return Code
    if(block.type === 'share') return Share
    if(block.type === 'follow') return Follow
  }

}

export default Block
