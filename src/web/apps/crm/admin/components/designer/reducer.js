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
          content: [
            'preheader'
          ],
          settings: {
            columns: 1
          },
          style: {}
        }
      ],
      header: [
        {
          type: 'text',
          content: [
            'header'
          ],
          settings: {
            columns: 1
          }
        }
      ],
      body: [
        {
          type: 'text',
          content: [
            '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><h4>Heading 4</h4><p>Lorem ipsum dolor amet franzen taiyaki raw denim heirloom retro, prism lyft pop-up yuccie tumblr mlkshk tousled art party stumptown pug. Cold-pressed live-edge activated charcoal 90s pok pok dreamcatcher. Tousled normcore ramps, locavore edison bulb pinterest craft beer lyft four dollar toast. Lumbersexual polaroid vexillologist cornhole trust fund ethical gluten-free.</p>'
          ],
          settings: {
            columns: 1
          }
        }
      ],
      footer: [
        {
          type: 'text',
          content: [
            'footer'
          ],
          settings: {
            columns: 1
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
