import numeral from 'numeral'
import moment from 'moment'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const getRoot = () => {
  const root = path.resolve(__dirname,'..','..','..','..')
  if(process.env.NODE_ENV === 'production') return path.join(root,'public','admin','css')
  return path.join(root,'core','admin','public','css')
}

const root = getRoot()
const template  = fs.readFileSync(path.join(__dirname, 'email.ejs'), 'utf8')
const core = fs.readFileSync(path.join(root,'foundation-emails.min.css')).toString()
const overrides = fs.readFileSync(path.join(root,'foundation-overrides.min.css')).toString()

export const renderEmail = (req, params) => {
  const { config, subject } = params
  const rendered = ejs.render(template, {
    config,
    style: getStyle(config),
    host: process.env.WEB_HOST,
    _
  })
  const data = {
    ...params.data,
    moment,
    numeral,
    _
  }
  return {
    subject: ejs.render(subject, data),
    html: ejs.render(rendered.replace(/&lt;%/g,'<%').replace(/%&gt;/g,'%>'), data)
  }
}

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

const getInlineStyle = (config) => [
  { selector: 'html', styles: [
    ...getProp(config, 'background-color', 'page.background_color')
  ] },
  ...['h1','h2','p'].map(selector => ({
    selector, styles: [
      ...getProp(config, 'font-family', `page.${selector}_font_family`),
      ...getProp(config, 'font-size', `page.${selector}_font_size`, 'px'),
      ...getFormat(config, 'font-weight', 'bold', `page.${selector}_format`, 'normal'),
      ...getFormat(config, 'font-style', 'italic', `page.${selector}_format`),
      ...getFormat(config, 'text-decoration', 'underline', `page.${selector}_format`),
      ...getProp(config, 'color', `page.${selector}_color`),
      ...getProp(config, 'text-align', `page.${selector}_text_align`),
      ...getProp(config, 'line-height', `page.${selector}_line_height`),
      ...getProp(config, 'letter-spacing', `page.${selector}_letter_spacing`, 'px')
    ]
  })),
  { selector: 'table.body', styles: [
    ...getProp(config, 'background-color', 'page.background_color')
  ] },
  { selector: 'table.body>tbody>tr>td.float-center', styles: [
    ...getProp(config, 'padding', 'page.padding', 'px')
  ] },
  { selector: 'table.container', styles: [
    ...getProp(config, 'background', 'page.email_background_color', null, 'none'),
    ...getBorder(config, 'border', 'page.email_border')
  ] },
  ...config.blocks.reduce((blockStyles, block, j) => [
    ...blockStyles,
    { selector: `table.block-${j} td,table.block-${j} p`, styles: [
      ...getProp(config, 'font-family',`blocks[${j}].font_family`),
      ...getProp(config, 'font-size',`blocks[${j}].font_size`, 'px'),
      ...getFormat(config, 'font-weight', 'bold', `blocks[${j}].format`, 'normal'),
      ...getFormat(config, 'font-style', 'italic', `blocks[${j}].format`),
      ...getFormat(config, 'text-decoration', 'underline', `blocks[${j}].format`),
      ...getProp(config, 'color',`blocks[${j}].color`),
      ...getProp(config, 'text-align',`blocks[${j}].text_align`),
      ...getProp(config, 'line-height',`blocks[${j}].line_height`),
      ...getProp(config, 'letter-spacing',`blocks[${j}].letter_spacing`, 'px')
    ] }, {
      selector: `table.block-${j} table.block-container`, styles: [
        ...getBorder(config, 'border', `blocks[${j}].border`),
        ...getProp(config, 'background-color',`blocks[${j}].background_color`)
      ]
    }, {
      selector: `table.block-${j} .block-container-cell`, styles: [
        ...getProp(config, 'padding',`blocks[${j}].padding`, 'px')
      ]
    },
    ...block.type === 'images' ? [
      {
        selector: `table.block-${j} td.image`, styles: [
          ...getProp(config, 'padding',`blocks[${j}].image_padding`, 'px')
        ]
      }, {
        selector: `table.block-${j} img`, styles: [
          ...getBorder(config, 'border', `blocks[${j}].image_border`),
          ...getProp(config, 'border-radius',`blocks[${j}].image_border_radius`, 'px')
        ]
      }
    ] : [],
    ..._.includes(['image','video'], block.type) ? [
      {
        selector: `table.block-${j} table.block-container .block-caption`, styles: [
          ...getProp(config, 'background-color',`blocks[${j}].caption_background_color`),
          ...getProp(config, 'padding',`blocks[${j}].caption_padding`, 'px')
        ]
      }, {
        selector: `table.block-${j} img`, styles: [
          ...getBorder(config, 'border', `blocks[${j}].image_border`),
          ...getProp(config, 'border-radius',`blocks[${j}].image_border_radius`, 'px')
        ]
      }
    ] : [],
    ...block.type === 'button' ? [
      {
        selector: `table.block-${j} table.button table td`, styles: [
          ...getProp(config, 'background-color',`blocks[${j}].button_background_color`),
          ...getProp(config, 'padding',`blocks[${j}].button_padding`, 'px'),
          ...getProp(config, 'border-radius',`blocks[${j}].button_border_radius`, 'px'),
          ...getProp(config, 'text-align',`blocks[${j}].text_align`),
          ...getProp(config, 'font-family',`blocks[${j}].font_family`),
          ...getProp(config, 'font-size',`blocks[${j}].font_size`, 'px'),
          ...getProp(config, 'letter-spacing',`blocks[${j}].letter_spacing`, 'px'),
          ...getProp(config, 'text-align',`blocks[${j}].text_align`),
          ...getProp(config, 'color',`blocks[${j}].color`)
        ]
      }
    ] : [],
    ..._.includes(['follow','share'], block.type) ? [
      {
        selector: `table.block-${j} table.social table`, styles: [
          ...getProp(config, 'background-color',`blocks[${j}].button_background_color`),
          ...getProp(config, 'border-radius',`blocks[${j}].button_border_radius`, 'px')
        ]
      },{
        selector: `table.block-${j} td.social-service td`, styles: [
          ...getProp(config, 'font-family',`blocks[${j}].font_family`),
          ...getProp(config, 'font-size',`blocks[${j}].font_size`, 'px'),
          ...getFormat(config, 'font-weight', 'bold', `blocks[${j}].format`, 'normal'),
          ...getFormat(config, 'font-style', 'italic', `blocks[${j}].format`),
          ...getFormat(config, 'text-decoration', 'underline', `blocks[${j}].format`),
          ...getProp(config, 'color',`blocks[${j}].color`),
          ...getProp(config, 'text-align',`blocks[${j}].text_align`),
          ...getProp(config, 'line-height',`blocks[${j}].line_height`),
          ...getProp(config, 'letter-spacing',`blocks[${j}].letter_spacing`, 'px')
        ]
      }
    ] : [],
    ...block.type === 'divider' ? [
      {
        selector: `table.block-${j} div.divider`, styles: [
          ...getProp(config, 'border-width',`blocks[${j}].divider_border_width`, 'px'),
          ...getProp(config, 'border-style',`blocks[${j}].divider_border_style`),
          ...getProp(config, 'border-color',`blocks[${j}].divider_border_color`)
        ]
      }
    ] : []
  ], [])
].map(item => item.styles.length === 0 ? '' : `
  ${item.selector} {
    ${ item.styles.map(style => `${style.prop}: ${style.value} !important;`).join('\n') }
  }
`).join('\n')
