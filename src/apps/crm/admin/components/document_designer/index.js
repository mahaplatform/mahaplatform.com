import Designer from '../designer'
import Divider from './divider'
import Section from './section'
import Layout from './layout'
import Images from './images'
import Text from './text'
import React from 'react'
import Page from './page'

class DocumentDesigner extends React.Component {

  render() {
    return <Designer { ...this._getDesigner() } />
  }

  _getDesigner() {
    return {
      title: 'Document',
      canvas: '/apps/crm/document/index.html',
      components: {
        divider: Divider,
        image: Images,
        layout: Layout,
        page: Page,
        section: Section,
        text: Text
      },
      defaults: {
        page: {
          page_color: '#FFFFFF',
          orientation: 'portrait',
          paper_size: 'letter',
          margin_top: 1,
          margin_bottom: 1,
          margin_left: 1,
          margin_right: 1,
          h1_font_family: 'Arial, Helvetica, sans-serif',
          h1_font_size: '28px',
          h1_color: '#202020',
          h1_format: ['bold'],
          h1_text_align: 'left',
          h1_line_height: 1,
          h1_letter_spacing: null,
          h2_font_family: 'Arial, Helvetica, sans-serif',
          h2_font_size: '24px',
          h2_color: '#202020',
          h2_format: ['bold'],
          h2_text_align: 'left',
          h2_line_height: 1,
          h2_letter_spacing: null,
          h3_font_family: 'Arial, Helvetica, sans-serif',
          h3_font_size: '22px',
          h3_color: '#202020',
          h3_format: ['bold'],
          h3_text_align: 'left',
          h3_line_height: 1,
          h3_letter_spacing: null,
          h4_font_family: 'Arial, Helvetica, sans-serif',
          h4_font_size: '20px',
          h4_color: '#202020',
          h4_format: ['bold'],
          h4_text_align: 'left',
          h4_line_height: 1,
          h4_letter_spacing: null,
          p_font_family: 'Arial, Helvetica, sans-serif',
          p_font_size: '18px',
          p_color: '#202020',
          p_format: [],
          p_text_align: 'left',
          p_line_height: 1.5,
          p_letter_spacing: null
        },
        section: {
          label: null,
          background_color: null,
          padding_top: 10,
          padding_bottom: 10,
          font_family: null,
          font_size: null,
          color: null,
          text_align: 'left',
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
          icon: 'align-justify'
        }, {
          label: 'Divider Block',
          type: 'divider',
          icon: 'minus'
        }, {
          label: 'Layout Block',
          type: 'layout',
          icon: 'columns'
        }, {
          label: 'Image Block',
          type: 'images',
          icon: 'picture-o'
        }
      ]
    }
  }

}

export default DocumentDesigner
