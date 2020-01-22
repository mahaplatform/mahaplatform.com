import Divider from './blocks/divider'
import Button from './blocks/button'
import Images from './blocks/images'
import Follow from './blocks/follow'
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
    onSave: PropTypes.func
  }

  render() {
    return <Designer { ...this._getDesigner() } />
  }

  _getDesigner() {
    const { defaultValue, onSave } = this.props
    return {
      title: 'Email',
      canvas: '/crm/email/index.html',
      preview: true,
      components: {
        page: Page,
        section: Section
      },
      blocks: [
        {
          label: 'Text Block',
          type: 'text',
          icon: 'align-justify',
          component: Text
        }, {
          label: 'Divider Block',
          type: 'divider',
          icon: 'minus',
          component: Divider
        }, {
          label: 'Image Block',
          type: 'images',
          icon: 'picture-o',
          component: Images
        }, {
          label: 'Button Block',
          type: 'button',
          icon: 'mouse-pointer',
          component: Button
        }, {
          label: 'Social Share Block',
          type: 'share',
          icon: 'share',
          component: Share
        }, {
          label: 'Social Follow Block',
          type: 'follow',
          icon: 'plus',
          component: Follow
        }, {
          label: 'Video Block',
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
