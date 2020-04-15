import numeral from 'numeral'
import moment from 'moment'
import _ from 'lodash'
import ejs from 'ejs'

const personalizeEmail = (req, params) => {
  const { data, html, subject } = params
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
