import _ from 'lodash'

const INITIAL_STATE = {
  active: {
    section: null,
    block: null
  },
  config: {
    content: {
      preheader: [],
      header: [],
      body: [],
      footer: []
    },
    design: {
      page: {
        background_color: '#2185D0',
        h1_font_family: 'Arial, Helvetica, sans-serif',
        h1_font_size: '28px',
        h1_color: '#222222',
        h1_bold: true,
        h1_italic: false,
        h1_text_align: false,
        h1_line_height: 1,
        h1_letter_spacing: '0px',
        h2_font_family: 'Arial, Helvetica, sans-serif',
        h2_font_size: '24px',
        h2_color: '#222222',
        h2_bold: true,
        h2_italic: false,
        h2_text_align: false,
        h2_line_height: 1,
        h2_letter_spacing: '0px',
        h3_font_family: 'Arial, Helvetica, sans-serif',
        h3_font_size: '22px',
        h3_color: '#222222',
        h3_bold: true,
        h3_italic: false,
        h3_text_align: false,
        h3_line_height: 1,
        h3_letter_spacing: '0px',
        h4_font_family: 'Arial, Helvetica, sans-serif',
        h4_font_size: '20px',
        h4_color: '#222222',
        h4_bold: true,
        h4_italic: false,
        h4_text_align: false,
        h4_line_height: 1,
        h4_letter_spacing: '0px',
        p_font_family: 'Arial, Helvetica, sans-serif',
        p_font_size: '18px',
        p_color: '#222222',
        p_bold: false,
        p_italic: false,
        p_text_align: false,
        p_line_height: 1.5,
        p_letter_spacing: '0px'
      },
      preheader: {
        background_color: null,
        background_image: null,
        border_top: null,
        border_bottom: null,
        padding_top: '10px',
        padding_bottom: '10px',
        text_font_family: null,
        text_font_size: null,
        text_color: null,
        text_text_align: null,
        text_line_height: null,
        link_color: null,
        link_bold: null,
        link_underline: null
      },
      header: {
        background_color: null,
        background_image: null,
        border_top: null,
        border_bottom: null,
        padding_top: '10px',
        padding_bottom: '10px',
        text_font_family: null,
        text_font_size: null,
        text_color: null,
        text_text_align: null,
        text_line_height: null,
        link_color: null,
        link_bold: null,
        link_underline: null
      },
      body: {
        background_color: null,
        background_image: null,
        border_top: null,
        border_bottom: null,
        padding_top: '10px',
        padding_bottom: '10px',
        text_font_family: null,
        text_font_size: null,
        text_color: null,
        text_text_align: null,
        text_line_height: null,
        link_color: null,
        link_bold: null,
        link_underline: null
      },
      footer: {
        background_color: null,
        background_image: null,
        border_top: null,
        border_bottom: null,
        padding_top: '10px',
        padding_bottom: '10px',
        text_font_family: null,
        text_font_size: null,
        text_color: null,
        text_text_align: null,
        text_line_height: null,
        link_color: null,
        link_bold: null,
        link_underline: null
      },
      mobile: {
        background_color: null,
        background_image: null,
        border_top: null,
        border_bottom: null,
        padding_top: '10px',
        padding_bottom: '10px',
        text_font_family: null,
        text_font_size: null,
        text_color: null,
        text_text_align: null,
        text_line_height: null,
        link_color: null,
        link_bold: null,
        link_underline: null
      }
    }
  },
  deviceIndex: 0,
  orientationIndex: 0
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE_VIEWPORT':
    return {
      ...state,
      [`${action.key}Index`]: action.value
    }

  case 'ADD':
    return {
      ...state,
      active: {
        section: null,
        block: null
      },
      config: {
        ...state.config,
        content: {
          ...state.config.content,
          [action.section]: [
            ...state.config.content[action.section],
            action.block
          ]
        }
      }
    }

  case 'CLONE':
    return {
      ...state,
      active: {
        section: null,
        block: null
      },
      config: {
        ...state.config,
        content: {
          ...state.config.content,
          [action.section]: [
            ...state.config.content[action.section],
            state.config.content[action.section][action.block]
          ]
        }
      }
    }

  case 'EDIT':
    return {
      ...state,
      active: {
        section: action.section,
        block: action.block
      }
    }

  case 'REMOVE':
    return {
      ...state,
      active: {
        section: null,
        block: null
      },
      config: {
        ...state.config,
        content: {
          ...state.config.content,
          [action.section]: [
            ...state.config.content[action.section].filter((block, index) => {
              return index !== action.block
            })
          ]
        }
      }
    }

  case 'UPDATE':
    return {
      ...state,
      config: _.set(_.cloneDeep(state.config), action.key, action.value)
    }

  default:
    return state
  }

}

export default reducer
