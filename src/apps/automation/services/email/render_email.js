import Event from '@apps/events/models/event'
import Asset from '@apps/maha/models/asset'
import Form from '@apps/forms/models/form'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const template  = fs.readFileSync(path.join(__dirname, 'email.ejs'), 'utf8')
const core = fs.readFileSync(path.join(__dirname,'foundation-emails.min.css')).toString()
const overrides = fs.readFileSync(path.join(__dirname,'foundation-overrides.min.css')).toString()

const getObjectsOfType = async (req, { model, ids }) => {
  if(ids.length === 0) return {}
  return await model.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.whereIn('id', ids)
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.reduce((mapped, result) => ({
    ...mapped,
    [result.get('id')]: result
  }), {}))
}

const getObjects = async (req, { config }) => {
  const ids = ['header','body','footer'].reduce((ids, section) => {
    return config[section].blocks.reduce((local, block) => ({
      asset: [
        ...local.asset,
        ...block.asset_id ? [block.asset_id] : []
      ],
      event: [
        ...local.event,
        ...block.event_id ? [block.event_id] : []
      ],
      form: [
        ...local.form,
        ...block.form_id ? [block.form_id] : []
      ]
    }), ids)
  }, { asset: [], event: [], form: [] })
  return {
    assets: await getObjectsOfType(req, {
      model: Asset,
      ids: ids.asset
    }),
    events: await getObjectsOfType(req, {
      model: Event,
      ids: ids.event
    }),
    forms: await getObjectsOfType(req, {
      model: Form,
      ids: ids.form
    })
  }
}

const getPadding = (config, key) => [
  ...getProp(config, 'padding-top', key, 'px'),
  ...getProp(config, 'padding-right', key, 'px'),
  ...getProp(config, 'padding-bottom', key, 'px'),
  ...getProp(config, 'padding-left', key, 'px')
]

const getBackground = (config, key) => [
  ...getProp(config, 'background', key),
  ...getProp(config, 'background-color', key)
]

const getProp = (config, prop, key, unit = null, defaultValue = null) => {
  const value = _.get(config, key)
  const adjusted = !_.isNil(value) ? value : defaultValue
  const formatted = unit ? `${adjusted}${unit}` : value
  return !_.isNil(value) ? [{ prop, value: formatted }] : []
}

const getFormat = (config, prop, targetValue, key, defaultValue) => {
  const formats = _.get(config, key) || []
  const selected = _.includes(formats, targetValue)
  const value = selected ? targetValue : defaultValue
  return selected ? [{ prop, value }] : []
}

const getBorder = (config, prop, key) => {
  const width = _.get(config, `${key}_width`)
  const style = _.get(config, `${key}_style`)
  const color = _.get(config, `${key}_color`)
  if(!_.isNil(width) && !_.isNil(style) && !_.isNil(color)) {
    return [{ prop, value: `${width}px ${style} ${color}` }]
  }
  return []
}

const getStyle = (config) => {
  const inline = getInlineStyle(config)
  return [core,overrides,inline].map(sheet => {
    return `<style>${sheet}</style>`
  }).join('')
}

const sections = ['header', 'body', 'footer']

const selectors = [
  { selector: 'h1', blocks: ['h1'] },
  { selector: 'h2', blocks: ['h2'] },
  { selector: 'p', blocks: ['p','li','td'] }
]

const getInlineStyle = (config) => [
  { selector: 'html,body,table.body', styles: [
    ...getBackground(config, 'page.background_color')
  ] },
  ...selectors.reduce((selectorStyles, style) => [
    ...selectorStyles,
    ...style.blocks.reduce((blockStyles, block) => [
      ...blockStyles,
      {
        selector: block, styles: [
          ...getProp(config, 'font-family', `page.${style.selector}_font_family`),
          ...getProp(config, 'font-size', `page.${style.selector}_font_size`, 'px'),
          ...getFormat(config, 'font-weight', 'bold', `page.${style.selector}_format`, 'normal'),
          ...getFormat(config, 'font-style', 'italic', `page.${style.selector}_format`),
          ...getFormat(config, 'text-decoration', 'underline', `page.${style.selector}_format`),
          ...getProp(config, 'color', `page.${style.selector}_color`),
          ...getProp(config, 'text-align', `page.${style.selector}_text_align`),
          ...getProp(config, 'line-height', `page.${style.selector}_line_height`, 'em'),
          ...getProp(config, 'letter-spacing', `page.${style.selector}_letter_spacing`, 'px')
        ]
      }
    ], [])
  ], []),
  { selector: 'a', styles: [
    ...getFormat(config, 'font-weight', 'bold', 'page.a_format', 'normal'),
    ...getFormat(config, 'font-style', 'italic', 'page.a_format'),
    ...getFormat(config, 'text-decoration', 'underline', 'page.a_format'),
    ...getProp(config, 'color', 'page.a_color')
  ] },
  { selector: 'table.body>tbody>tr>td.float-center', styles: [
    ...getPadding(config, 'page.')
  ] },
  { selector: 'table.container', styles: [
    ...getProp(config, 'background', 'page.email_background_color', null, 'none'),
    ...getBorder(config, 'border', 'page.email_border')
  ] },
  ...sections.reduce((sectionStyles, section, i) => [
    ...sectionStyles,
    { selector: `table.section-${section}`, styles: [
      ...getBackground(config, `${section}.background_color`)
    ] },
    ...config[section].blocks.reduce((blockStyles, block, j) => [
      ...blockStyles,
      ...selectors.reduce((selectorStyles, style) => [
        ...selectorStyles,
        ...style.blocks.reduce((blockStyles, block) => [
          ...blockStyles,
          {
            selector: `table.section-${section} table.block-${j} ${block}`, styles: [
              ...getProp(config, 'font-family', `${section}.blocks[${j}].${style.selector}_font_family`),
              ...getProp(config, 'font-size', `${section}.blocks[${j}].${style.selector}_font_size`, 'px'),
              ...getFormat(config, 'font-weight', 'bold', `${section}.blocks[${j}].${style.selector}_format`, 'normal'),
              ...getFormat(config, 'font-style', 'italic', `${section}.blocks[${j}].${style.selector}_format`),
              ...getFormat(config, 'text-decoration', 'underline', `${section}.blocks[${j}].${style.selector}_format`),
              ...getProp(config, 'color', `${section}.blocks[${j}].${style.selector}_color`),
              ...getProp(config, 'text-align', `${section}.blocks[${j}].${style.selector}_text_align`),
              ...getProp(config, 'line-height', `${section}.blocks[${j}].${style.selector}_line_height`, 'em'),
              ...getProp(config, 'letter-spacing', `${section}.blocks[${j}].${style.selector}_letter_spacing`, 'px')
            ]
          }
        ], [])
      ], []),
      { selector: `table.section-${section} table.block-${j} a`, styles: [
        ...getFormat(config, 'font-weight', 'bold', `${section}.blocks[${j}].a_format`, 'normal'),
        ...getFormat(config, 'font-style', 'italic', `${section}.blocks[${j}].a_format`),
        ...getFormat(config, 'text-decoration', 'underline', `${section}.blocks[${j}].a_format`),
        ...getProp(config, 'color', `${section}.blocks[${j}].a_color`)
      ] },
      {
        selector: `table.section-${section} table.block-${j} table.block-container`, styles: [
          ...getBorder(config, 'border', `${section}.blocks[${j}].border`),
          ...getBackground(config, `${section}.blocks[${j}].background_color`)
        ]
      }, {
        selector: `table.section-${section} table.block-${j} .block-container-cell`, styles: [
          ...getPadding(config, `${section}.blocks[${j}].padding`)
        ]
      },
      ...block.type === 'images' ? [
        {
          selector: `table.section-${section} table.section-${section} table.block-${j} td.image`, styles: [
            ...getPadding(config, `${section}.blocks[${j}].image_padding`)
          ]
        }, {
          selector: `table.section-${section} table.block-${j} img`, styles: [
            ...getBorder(config, 'border', `${section}.blocks[${j}].image_border`),
            ...getProp(config, 'border-radius',`${section}.blocks[${j}].image_border_radius`, 'px')
          ]
        }
      ] : [],
      ..._.includes(['image','video'], block.type) ? [
        {
          selector: `table.section-${section} table.block-${j} table.block-container .block-caption div`, styles: [
            ...getBackground(config, `${section}.blocks[${j}].caption_background_color`),
            ...getPadding(config, `${section}.blocks[${j}].caption_padding`)
          ]
        }, {
          selector: `table.section-${section} table.block-${j} table.block-container .block-image div`, styles: [
            ...getPadding(config, `${section}.blocks[${j}].image_padding`)
          ]
        }, {
          selector: `table.section-${section} table.block-${j} img`, styles: [
            ...getBorder(config, 'border', `${section}.blocks[${j}].image_border`),
            ...getProp(config, 'border-radius',`${section}.blocks[${j}].image_border_radius`, 'px')
          ]
        }
      ] : [],
      ...block.type === 'button' ? [
        {
          selector: `table.section-${section} table.block-${j} table.button table td`, styles: [
            ...getBackground(config, `${section}.blocks[${j}].button_background_color`),
            ...getPadding(config, `${section}.blocks[${j}].button_padding`),
            ...getProp(config, 'border-radius',`${section}.blocks[${j}].button_border_radius`, 'px')
          ]
        },
        {
          selector: `table.section-${section} table.block-${j} table.button table a`, styles: [
            ...getProp(config, 'font-family',`${section}.blocks[${j}].font_family`),
            ...getProp(config, 'font-size',`${section}.blocks[${j}].font_size`, 'px'),
            ...getProp(config, 'line-height', `${section}.blocks[${j}].line_height`, ''),
            ...getProp(config, 'letter-spacing',`${section}.blocks[${j}].letter_spacing`, 'px'),
            ...getProp(config, 'text-align',`${section}.blocks[${j}].text_align`),
            ...getFormat(config, 'font-weight', 'bold', `${section}.blocks[${j}].format`, 'normal'),
            ...getFormat(config, 'font-style', 'italic', `${section}.blocks[${j}].format`),
            ...getFormat(config, 'text-decoration', 'underline', `${section}.blocks[${j}].format`),
            ...getProp(config, 'color',`${section}.blocks[${j}].color`)
          ]
        }
      ] : [],
      ..._.includes(['follow','share'], block.type) ? [
        {
          selector: `table.section-${section} table.block-${j} table.social table`, styles: [
            ...getBackground(config, `${section}.blocks[${j}].button_background_color`),
            ...getProp(config, 'border-radius',`${section}.blocks[${j}].button_border_radius`, 'px')
          ]
        },{
          selector: `table.section-${section} table.block-${j} td.social-${block.type}-service td`, styles: [
            ...getProp(config, 'font-family',`${section}.blocks[${j}].font_family`),
            ...getProp(config, 'font-size',`${section}.blocks[${j}].font_size`, 'px'),
            ...getFormat(config, 'font-weight', 'bold', `${section}.blocks[${j}].format`, 'normal'),
            ...getFormat(config, 'font-style', 'italic', `${section}.blocks[${j}].format`),
            ...getFormat(config, 'text-decoration', 'underline', `${section}.blocks[${j}].format`),
            ...getProp(config, 'color',`${section}.blocks[${j}].color`),
            ...getProp(config, 'text-align',`${section}.blocks[${j}].text_align`),
            ...getProp(config, 'line-height',`${section}.blocks[${j}].line_height`, 'em'),
            ...getProp(config, 'letter-spacing',`${section}.blocks[${j}].letter_spacing`, 'px')
          ]
        }
      ] : [],
      ...block.type === 'divider' ? [
        {
          selector: `table.section-${section} table.block-${j} div.divider`, styles: [
            ...getProp(config, 'border-width',`${section}.blocks[${j}].divider_border_width`, 'px'),
            ...getProp(config, 'border-style',`${section}.blocks[${j}].divider_border_style`),
            ...getProp(config, 'border-color',`${section}.blocks[${j}].divider_border_color`)
          ]
        }
      ] : []
    ], [])
  ], [])
].map(item => item.styles.length === 0 ? '' : `
  ${item.selector} {
    ${ item.styles.map(style => `${style.prop}: ${style.value};`).join('\n') }
  }
`).join('\n')

const renderEmail = async (req, { config, data }) => {
  const objects = await getObjects(req, { config })
  const rendered = ejs.render(template, {
    ...data,
    includePath: path.resolve(__dirname),
    objects,
    config,
    style: getStyle(config),
    host: process.env.ADMIN_HOST,
    _
  })
  return rendered.replace(/&lt;%/g,'<%').replace(/%&gt;/g,'%>')
}

export default renderEmail
