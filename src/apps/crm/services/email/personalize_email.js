import numeral from 'numeral'
import moment from 'moment'
import _ from 'lodash'
import ejs from 'ejs'

const personalizeEmail = (req, params) => {
  const subject = params.subject.replace(/&nbsp;/g, ' ').replace(/\u2028/g,'')
  const html = params.html.replace(/&nbsp;/g, ' ').replace(/\u2028/g,'')
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
