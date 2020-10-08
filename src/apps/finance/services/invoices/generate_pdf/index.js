import * as puppeteer from '../../../../../core/services/puppeteer'
import pluralize from 'pluralize'
import numeral from 'numeral'
import moment from 'moment'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const generatePDF = async (req, { invoice }) => {

  const template = fs.readFileSync(path.join(__dirname, 'invoice.ejs'), 'utf8')

  const html = ejs.render(template, {
    host: process.env.WEB_HOST,
    pluralize,
    numeral,
    moment,
    invoice,
    _
  })

  const output = await puppeteer.generatePDF({
    html
  })

  return output

}

export default generatePDF
