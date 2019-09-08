import _ from 'lodash'

const INITIAL_STATE = {
  active: {
    section: null,
    block: null
  },
  config: {
    page: {
      background_color: null,
      border_top: null,
      email_background_color: null,
      email_border: null,
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
    sections: []
  },
  deviceIndex: 0,
  editable: true,
  orientationIndex: 0
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE_VIEWPORT':
    return {
      ...state,
      [`${action.key}Index`]: action.value
    }

  case 'ADD_SECTION':
    return {
      ...state,
      active: {
        section: null,
        block: null
      },
      config: {
        ...state.config,
        sections: [
          ...state.config.sections,
          action.section
        ]
      }
    }

  case 'DELETE_SECTION':
    return {
      ...state,
      active: {
        section: null,
        block: null
      },
      config: {
        ...state.config,
        sections: [
          ...state.config.sections.filter((section, index) => {
            return index !== action.index
          })
        ]
      }
    }

  case 'ADD':
    return {
      ...state,
      active: {
        section: action.section,
        block: state.config.sections[action.section].blocks.length
      },
      config: {
        ...state.config,
        sections: [
          ...state.config.sections.map((section, i) => {
            if(i !== action.section) return section
            return {
              ...state.config.sections[i],
              blocks: [
                ...state.config.sections[i].blocks,
                action.block
              ]
            }
          })
        ]
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
        sections: [
          ...state.config.sections.map((section, i) => {
            if(i !== action.section) return section
            return {
              ...section,
              blocks: [
                ...state.config.sections[i].blocks,
                state.config.sections[i].blocks[action.block]
              ]
            }
          })
        ]
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
        sections: [
          ...state.config.sections.map((section, i) => {
            if(i !== action.section) return section
            return {
              ...section,
              blocks: [
                ...state.config.sections[i].blocks.filter((block, j) => {
                  return j !== action.block
                })
              ]
            }
          })
        ]
      }
    }

  case 'UPDATE':
    return {
      ...state,
      config: _.set(_.cloneDeep(state.config), action.key, action.value)
    }

  case 'EDITABLE':
    return {
      ...state,
      editable: action.editable
    }

  default:
    return state
  }

}

export default reducer
