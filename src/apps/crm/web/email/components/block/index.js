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
    active: PropTypes.object,
    blockIndex: PropTypes.number,
    config: PropTypes.object,
    editable: PropTypes.bool,
    section: PropTypes.string,
    onAction: PropTypes.func
  }

  render() {
    const { blockIndex, config, editable } = this.props
    const Component  = this._getComponent()
    return (
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
        { editable &&
          <div className="block-highlight" />
        }
        { editable &&
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
        }
      </div>
    )
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

export default Block
