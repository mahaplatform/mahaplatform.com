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
      defaults: {
        page: {
          background_color: null,
          border_top_width: null,
          border_top_style: null,
          border_top_color: null,
          padding: 10,
          email_background_color: null,
          email_border_width: null,
          email_border_style: null,
          email_border_color: null,
          h1_font_family: 'Arial, Helvetica, sans-serif',
          h1_font_size: '28px',
          h1_color: '#222222',
          h1_format: ['bold'],
          h1_text_align: false,
          h1_line_height: 1,
          h1_letter_spacing: '0px',
          h2_font_family: 'Arial, Helvetica, sans-serif',
          h2_font_size: '24px',
          h2_color: '#222222',
          h2_format: ['bold'],
          h2_text_align: false,
          h2_line_height: 1,
          h2_letter_spacing: '0px',
          h3_font_family: 'Arial, Helvetica, sans-serif',
          h3_font_size: '22px',
          h3_color: '#222222',
          h3_format: ['bold'],
          h3_text_align: false,
          h3_line_height: 1,
          h3_letter_spacing: '0px',
          h4_font_family: 'Arial, Helvetica, sans-serif',
          h4_font_size: '20px',
          h4_color: '#222222',
          h4_format: ['bold'],
          h4_text_align: false,
          h4_line_height: 1,
          h4_letter_spacing: '0px',
          p_font_family: 'Arial, Helvetica, sans-serif',
          p_font_size: '18px',
          p_color: '#222222',
          p_format: [],
          p_text_align: false,
          p_line_height: 1.5,
          p_letter_spacing: '0px'
        },
        section: {
          label: null,
          background_color: null,
          background_image: null,
          border_top: null,
          border_bottom: null,
          padding_top: 10,
          padding_bottom: 10,
          font_family: null,
          font_size: null,
          color: null,
          text_align: null,
          line_height: null,
          link_color: null,
          link_bold: null,
          link_underline: null,
          blocks: []
        }
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
