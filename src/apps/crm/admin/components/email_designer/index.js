import Preferences from './blocks/preferences'
import Divider from './blocks/divider'
import Button from './blocks/button'
// import Images from './blocks/images'
import Follow from './blocks/follow'
import Image from './blocks/image'
import Share from './blocks/share'
import Video from './blocks/video'
import PropTypes from 'prop-types'
import Designer from '../designer'
import Text from './blocks/text'
import Section from './section'
import Web from './blocks/web'
import React from 'react'
import Page from './page'

class EmailDesigner extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    editable: PropTypes.bool,
    endpoint: PropTypes.string,
    fields: PropTypes.array,
    program: PropTypes.object,
    settings: PropTypes.bool,
    tokens: PropTypes.array
  }

  static defaultProps = {
    settings: true
  }

  render() {
    return <Designer { ...this._getDesigner() } />
  }

  _getDesigner() {
    const { defaultValue, editable, endpoint, program, settings, tokens } = this.props
    return {
      title: 'Email',
      canvas: '/apps/crm/email/index.html',
      editable,
      endpoint,
      preview: true,
      components: {
        page: Page,
        section: Section
      },
      program_id: program.id,
      settings,
      tokens,
      blocks: [
        { label: 'Text', type: 'text', icon: 'align-justify', component: Text },
        { label: 'Divider', type: 'divider', icon: 'minus', component: Divider },
        // { label: 'Image Group', type: 'images', icon: 'th', component: Images },
        { label: 'Image', type: 'image', icon: 'picture-o', component: Image },
        { label: 'Button', type: 'button', icon: 'mouse-pointer', component: Button },
        { label: 'Preferences', type: 'preferences', icon: 'check', component: Preferences },
        { label: 'Social Share', type: 'share', icon: 'share', component: Share },
        { label: 'Social Follow', type: 'follow', icon: 'plus', component: Follow },
        { label: 'Video', type: 'video', icon: 'play', component: Video },
        { label: 'Web Version', type: 'web', icon: 'globe', component: Web }
      ],
      defaultValue
    }
  }

}

export default EmailDesigner
