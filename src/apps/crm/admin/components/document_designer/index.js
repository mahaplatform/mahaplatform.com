import Designer from '../designer'
import Divider from './blocks/divider'
import Images from './blocks/images'
import Text from './blocks/text'
import React from 'react'

class DocumentDesigner extends React.Component {

  render() {
    return <Designer { ...this._getDesigner() } />
  }

  _getDesigner() {
    return {
      title: 'Document',
      canvas: '/templates/document.html',
      defaults: {
        page: {
          background_color: '#FFFFFF',
          padding_top: 50,
          padding_right: 50,
          padding_bottom: 50,
          padding_left: 50,
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
          label: 'Layout Block',
          type: 'layout',
          icon: 'columns',
          component: Divider
        }, {
          label: 'Image Block',
          type: 'images',
          icon: 'picture-o',
          component: Images
        }
      ]
    }
  }

}

export default DocumentDesigner
