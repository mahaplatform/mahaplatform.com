import PropTypes from 'prop-types'
import Designer from '../designer'
import Divider from './divider'
import Section from './section'
import Button from './button'
import Footer from './footer'
import Images from './images'
import Follow from './follow'
import Share from './share'
import Video from './video'
import Text from './text'
import Code from './code'
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
      canvas: '/templates/email.html',
      preview: true,
      components: {
        button: Button,
        code: Code,
        divider: Divider,
        footer: Footer,
        follow: Follow,
        images: Images,
        page: Page,
        section: Section,
        share: Share,
        text: Text,
        video: Video
      },
      defaults: {
        page: {
          background_color: null,
          border_top_style: null,
          border_top_width: null,
          border_top_color: null,
          padding: 10,
          email_background_color: null,
          email_border: null,
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
        },
        text: {
          columns: 1,
          split: [12],
          content_0: '<p>Messenger bag portland adaptogen food truck pabst, la croix pug vinyl mumblecore chartreuse. Art party schlitz portland, try-hard semiotics tumblr green juice gentrify letterpress tilde gochujang whatever helvetica tote bag. Locavore quinoa man braid cred selvage chambray. Post-ironic everyday carry kale chips umami woke polaroid, meggings organic pork belly air plant.</p>',
          content_1: '<p>Messenger bag portland adaptogen food truck pabst, la croix pug vinyl mumblecore chartreuse. Art party schlitz portland, try-hard semiotics tumblr green juice gentrify letterpress tilde gochujang whatever helvetica tote bag. Locavore quinoa man braid cred selvage chambray. Post-ironic everyday carry kale chips umami woke polaroid, meggings organic pork belly air plant.</p>',
          font_family: null,
          font_size: null,
          color: null,
          line_height: null,
          letter_spacing: null
        },
        divider: {
          padding_top: '18px',
          padding_bottom: '18px',
          border: '2px solid #000000',
          background_color: null
        },
        images: {
          border: null,
          border_radius: null,
          images: [],
          layout: [1],
          padding: 0
        },
        button: {
          content: 'Click Me',
          link_strategy: 'web',
          url: null,
          email_address: null,
          email_subject: null,
          email_body: null,
          anchor: null,
          asset_id: null,
          open_in_new_window: true,
          title: null,
          class: null,
          border: null,
          border_radius: null,
          background_color: '#2185D0',
          color: '#FFFFFF',
          letter_spacing: 0,
          font_family: null,
          font_size: null,
          padding: 10,
          align: 'center',
          display: 'block'
        },
        share: {
          align: 'center',
          icon_style: 'outline',
          icon_color: 'dark',
          button_background_color: null,
          button_border_radius: 0,
          networks: [
            { service: 'facebook', text: 'Share' },
            { service: 'twitter', text: 'Tweet' },
            { service: 'forwardtofriend', text: 'Forward' }
          ]
        },
        follow: {
          align: 'center',
          icon_style: 'outline',
          icon_color: 'dark',
          button_background_color: null,
          button_border_radius: 0,
          networks: [
            { service: 'facebook', url: 'http://facebook.com' },
            { service: 'twitter', url: 'http://twitter.com' },
            { service: 'website', url: 'http://yourwebsite.com' }
          ]
        },
        footer: {},
        code: {
          content: '<p>This is some custom HTML</p>'
        },
        video: {
          video: null,
          card_background_color: null,
          card_border: null,
          image_border: null,
          image_border_radius: 0,
          caption_position: 'top',
          image_alignment: 'center',
          caption_width: 'two_thirds'
        }
      },
      blocks: [
        {
          label: 'Text Block',
          type: 'text',
          icon: 'align-justify'
        }, {
          label: 'Divider Block',
          type: 'divider',
          icon: 'minus'
        }, {
          label: 'Image Block',
          type: 'images',
          icon: 'picture-o'
        }, {
          label: 'Button Block',
          type: 'button',
          icon: 'mouse-pointer'
        }, {
          label: 'Social Share Block',
          type: 'share',
          icon: 'share'
        }, {
          label: 'Social Follow Block',
          type: 'follow',
          icon: 'plus'
        }, {
          label: 'Footer Block',
          type: 'footer',
          icon: 'file-text-o'
        }, {
          label: 'Code Block',
          type: 'code',
          icon: 'code'
        }, {
          label: 'Video Block',
          type: 'video',
          icon: 'play-circle'
        }
      ],
      defaultValue,
      onSave
    }
  }

}

export default EmailDesigner
