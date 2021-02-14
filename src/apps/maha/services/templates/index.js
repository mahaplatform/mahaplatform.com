import numeral from 'numeral'
import moment from 'moment'
import _ from 'lodash'
import ejs from 'ejs'

const sanitizeTemplate = (content) => {
  content = content.replace(/&nbsp;/g, ' ')
  content = content.replace(/\u2028/g,'')
  const tags = content.match(/<%- ([\w]*)\.([\w]*) %>/g)
  if(tags) {
    tags.map(tag => {
      const [fulltag, object, prop] = tag.match(/<%- ([\w]*)\.([\w]*) %>/)
      content = content.replace(fulltag, `<%- (typeof(${object}) !== "undefined" && ${object}['${prop}']) ? ${object}['${prop}'] : '' %>`)
    })
  }
  return content
}

export const interpolateTemplate = (req, params) => {
  const template = sanitizeTemplate(params.template)
  return ejs.render(template, {
    ...params.data,
    moment,
    numeral,
    _
  })
}
