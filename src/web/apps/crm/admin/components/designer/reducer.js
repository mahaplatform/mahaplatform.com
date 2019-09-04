import _ from 'lodash'

const INITIAL_STATE = {
  active: {
    section: null,
    block: null
  },
  config: {
    content: {
      preheader: [
        {
          type: 'text',
          config: {
            content: [
              'preheader'
            ],
            columns: 1
          }
        }
      ],
      header: [
        {
          type: 'text',
          config: {
            columns: 1,
            content: [
              'header'
            ]
          }
        }
      ],
      body: [
        {
          type: 'text',
          config: {
            columns: 1,
            content: [
              '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><h4>Heading 4</h4><p>Lorem ipsum dolor amet franzen taiyaki raw denim heirloom retro, prism lyft pop-up yuccie tumblr mlkshk tousled art party stumptown pug. Cold-pressed live-edge activated charcoal 90s pok pok dreamcatcher. Tousled normcore ramps, locavore edison bulb pinterest craft beer lyft four dollar toast. Lumbersexual polaroid vexillologist cornhole trust fund ethical gluten-free.</p>'
            ]
          }
        }, {
          type: 'button',
          config: {
            content: 'Buy Now',
            link_strategy: 'web',
            url: 'http://ccetompkins.org',
            email_address: null,
            email_subject: null,
            email_body: null,
            anchor: null,
            asset_id: null,
            open_in_new_window: true,
            title: 'Buy Now',
            class: 'but-button',
            border: null,
            radius: '10%',
            background_color: null,
            color: null,
            letter_spacing: 0,
            font_family: 'Arial',
            font_size: '13px',
            padding: '18px',
            align: 'center',
            display: 'block'
          }
        }
      ],
      footer: [
        {
          type: 'text',
          config: {
            columns: 1,
            content: [
              'footer'
            ]
          }
        }
      ]
    },
    design: {}
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
