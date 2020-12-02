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
      content = content.replace(fulltag, `<%- ( typeof(${object}) !== "undefined" && ${object}['${prop}']) ? ${object}['${prop}'] : ''%>`)
    })
  }
  return content
}

const personalizeEmail = (req, params) => {
  const subject = sanitizeTemplate(params.subject)
  const html = sanitizeTemplate(params.html)
  const { data } = params
  const variables = {
    ...data,
    moment,
    numeral,
    _
  }
  return {
    subject: ejs.render(subject, variables),
    html: ejs.render(html, variables)
  }
}

export default personalizeEmail
