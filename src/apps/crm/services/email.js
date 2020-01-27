import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const template  = fs.readFileSync(path.join(__dirname, 'email.ejs'), 'utf8')

export const renderEmail = (req, { config, data }) => {

  const html = ejs.render(template, {
    config,
    host: 'https://mahaplatform.com'//process.env.WEB_HOST
  })

  return html

}
