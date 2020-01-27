import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const template  = fs.readFileSync(path.join(__dirname, 'email.ejs'), 'utf8')

const root = path.resolve(__dirname,'..','..','..','core','admin','public','css')

const core = fs.readFileSync(path.join(root,'foundation-emails.min.css')).toString()

const overrides = fs.readFileSync(path.join(root,'foundation-overrides.min.css')).toString()

export const renderEmail = (req, { config, data }) => {

  const html = ejs.render(template, {
    config,
    style: getStyle(config),
    host: 'https://mahaplatform.com'//process.env.WEB_HOST
  })

  return html

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
  console.log(config.sections[0].blocks[0])
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
    ...getProp(config, 'background-color', 'page.background_color'),
    ...getBorder(config, 'border-top', 'page.border_top')
  ] },
  { selector: 'table.body>tbody>tr>td.float-center', styles: [
    ...getProp(config, 'padding', 'page.padding', 'px')
  ] },
  { selector: 'table.container', styles: [
    ...getProp(config, 'background', 'page.email_background_color', null, 'none'),
    ...getBorder(config, 'border', 'page.email_border')
  ] },
  ...config.sections.reduce((sectionStyles, section, i) => [
    ...sectionStyles,
    { selector: `table.section-${i}`, styles: [
      ...getBorder(config, 'border', `sections[${i}].border`),
      ...getProp(config, 'background-color',`sections[${i}].background_color`)
    ] },
    { selector: `table.section-${i} > tbody > tr > td`, styles: [
      ...getProp(config, 'padding',`sections[${i}].padding`, 'px')
    ] },
    { selector: `table.section-${i} td,table.section-${i} p`, styles: [
      ...getProp(config, 'font-family',`sections[${i}].font_family`),
      ...getProp(config, 'font-size',`sections[${i}].font_size`, 'px'),
      ...getProp(config, 'color',`sections[${i}].color`),
      ...getProp(config, 'text-align',`sections[${i}].text_align`),
      ...getProp(config, 'line-height',`sections[${i}].line_height`),
      ...getProp(config, 'letter-spacing',`sections[${i}].letter_spacing`, 'px')
    ] },
    { selector: `table.section-${i} td a`, styles: [
      ...getProp(config, 'color',`sections[${i}].color`)
    ] },
    ...config.sections[i].blocks.reduce((blockStyles, block, j) => [
      ...blockStyles,
      { selector: `table.section-${i}-block-${j} td,table.section-${i}-block-${j} p`, styles: [
        ...getProp(config, 'font-family',`sections[${i}].blocks[${j}].font_family`),
        ...getProp(config, 'font-size',`sections[${i}].blocks[${j}].font_size`, 'px'),
        ...getFormat(config, 'font-weight', 'bold', `sections[${i}].blocks[${j}].format`, 'normal'),
        ...getFormat(config, 'font-style', 'italic', `sections[${i}].blocks[${j}].format`),
        ...getFormat(config, 'text-decoration', 'underline', `sections[${i}].blocks[${j}].format`),
        ...getProp(config, 'color',`sections[${i}].blocks[${j}].color`),
        ...getProp(config, 'text-align',`sections[${i}].blocks[${j}].text_align`),
        ...getProp(config, 'line-height',`sections[${i}].blocks[${j}].line_height`),
        ...getProp(config, 'letter-spacing',`sections[${i}].blocks[${j}].letter_spacing`, 'px')
      ] }, {
        selector: `table.section-${i}-block-${j} table.block-container`, styles: [
          ...getBorder(config, 'border', `sections[${i}].blocks[${j}].border`),
          ...getProp(config, 'background-color',`sections[${i}].blocks[${j}].background_color`)
        ]
      }, {
        selector: `table.section-${i}-block-${j} .block-container-cell`, styles: [
          ...getProp(config, 'padding',`sections[${i}].blocks[${j}].padding`, 'px')
        ]
      },
      ...block.type === 'images' ? [
        {
          selector: `table.section-${i}-block-${j} td.image`, styles: [
            ...getProp(config, 'padding',`sections[${i}].blocks[${j}].image_padding`, 'px')
          ]
        }, {
          selector: `table.section-${i}-block-${j} img`, styles: [
            ...getBorder(config, 'border', `sections[${i}].blocks[${j}].image_border`),
            ...getProp(config, 'border-radius',`sections[${i}].blocks[${j}].image_border_radius`, 'px')
          ]
        }
      ] : [],
      ..._.includes(['image','video'], block.type) ? [
        {
          selector: `table.section-${i}-block-${j} table.block-container .block-caption`, styles: [
            ...getProp(config, 'background-color',`sections[${i}].blocks[${j}].caption_background_color`),
            ...getProp(config, 'padding',`sections[${i}].blocks[${j}].caption_padding`, 'px')
          ]
        }, {
          selector: `table.section-${i}-block-${j} img`, styles: [
            ...getBorder(config, 'border', `sections[${i}].blocks[${j}].image_border`),
            ...getProp(config, 'border-radius',`sections[${i}].blocks[${j}].image_border_radius`, 'px')
          ]
        }
      ] : [],
      ...block.type === 'button' ? [
        {
          selector: `table.section-${i}-block-${j} table.button table td`, styles: [
            ...getProp(config, 'background-color',`sections[${i}].blocks[${j}].button_background_color`),
            ...getProp(config, 'padding',`sections[${i}].blocks[${j}].button_padding`, 'px'),
            ...getProp(config, 'border-radius',`sections[${i}].blocks[${j}].button_border_radius`, 'px'),
            ...getProp(config, 'text-align',`sections[${i}].blocks[${j}].text_align`),
            ...getProp(config, 'font-family',`sections[${i}].blocks[${j}].font_family`),
            ...getProp(config, 'font-size',`sections[${i}].blocks[${j}].font_size`, 'px'),
            ...getProp(config, 'letter-spacing',`sections[${i}].blocks[${j}].letter_spacing`, 'px'),
            ...getProp(config, 'text-align',`sections[${i}].blocks[${j}].text_align`),
            ...getProp(config, 'color',`sections[${i}].blocks[${j}].color`)
          ]
        }
      ] : [],
      ..._.includes(['follow','share'], block.type) ? [
        {
          selector: `table.section-${i}-block-${j} table.social table`, styles: [
            ...getProp(config, 'background-color',`sections[${i}].blocks[${j}].button_background_color`),
            ...getProp(config, 'border-radius',`sections[${i}].blocks[${j}].button_border_radius`, 'px')
          ]
        },{
          selector: `table.section-${i}-block-${j} td.social-service td`, styles: [
            ...getProp(config, 'font-family',`sections[${i}].blocks[${j}].font_family`),
            ...getProp(config, 'font-size',`sections[${i}].blocks[${j}].font_size`, 'px'),
            ...getFormat(config, 'font-weight', 'bold', `sections[${i}].blocks[${j}].format`, 'normal'),
            ...getFormat(config, 'font-style', 'italic', `sections[${i}].blocks[${j}].format`),
            ...getFormat(config, 'text-decoration', 'underline', `sections[${i}].blocks[${j}].format`),
            ...getProp(config, 'color',`sections[${i}].blocks[${j}].color`),
            ...getProp(config, 'text-align',`sections[${i}].blocks[${j}].text_align`),
            ...getProp(config, 'line-height',`sections[${i}].blocks[${j}].line_height`),
            ...getProp(config, 'letter-spacing',`sections[${i}].blocks[${j}].letter_spacing`, 'px')
          ]
        }
      ] : [],
      ...block.type === 'divider' ? [
        {
          selector: `table.section-${i}-block-${j} .divider-block-content`, styles: [
            ...getProp(config, 'padding',`sections[${i}].blocks[${j}].padding`, 'px'),
            ...getProp(config, 'background-color',`sections[${i}].blocks[${j}].background_color`)
          ]
        },{
          selector: `table.section-${i}-block-${j} div.divider`, styles: [
            ...getProp(config, 'border-width',`sections[${i}].blocks[${j}].border_width`, 'px'),
            ...getProp(config, 'border-style',`sections[${i}].blocks[${j}].border_style`),
            ...getProp(config, 'border-color',`sections[${i}].blocks[${j}].border_color`)
          ]
        }
      ] : []
    ], [])
  ], [])
].map(item => item.styles.length === 0 ? '' : `
  ${item.selector} {
    ${ item.styles.map(style => `${style.prop}: ${style.value} !important;`).join('\n') }
  }
`).join('\n')
