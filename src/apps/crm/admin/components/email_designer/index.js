import Divider from './blocks/divider'
import Button from './blocks/button'
import Images from './blocks/images'
import Follow from './blocks/follow'
import Image from './blocks/image'
import Share from './blocks/share'
import Video from './blocks/video'
import PropTypes from 'prop-types'
import Designer from '../designer'
import Text from './blocks/text'
import Section from './section'
import React from 'react'
import Page from './page'

class EmailDesigner extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    tokens: PropTypes.object,
    onSave: PropTypes.func
  }

  render() {
    return <Designer { ...this._getDesigner() } />
  }

  _getDesigner() {
    const { defaultValue, tokens, onSave } = this.props
    return {
      title: 'Email',
      canvas: '/crm/email/index.html',
      preview: true,
      components: {
        page: Page,
        section: Section
      },
      tokens,
      blocks: [
        {
          label: 'Text',
          type: 'text',
          icon: 'align-justify',
          component: Text
        }, {
          label: 'Divider',
          type: 'divider',
          icon: 'minus',
          component: Divider
        }, {
          label: 'Image Group',
          type: 'images',
          icon: 'th',
          component: Images
        }, {
          label: 'Image',
          type: 'image',
          icon: 'picture-o',
          component: Image
        }, {
          label: 'Button',
          type: 'button',
          icon: 'mouse-pointer',
          component: Button
        }, {
          label: 'Social Share',
          type: 'share',
          icon: 'share',
          component: Share
        }, {
          label: 'Social Follow',
          type: 'follow',
          icon: 'plus',
          component: Follow
        }, {
          label: 'Video',
          type: 'video',
          icon: 'play-circle',
          component: Video
        }
      ],
      defaultValue,
      onSave
    }
  }

}

export default EmailDesigner
