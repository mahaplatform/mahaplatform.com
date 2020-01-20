import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const getValue = (environment) => (key) => {
  return process.env[`${environment.toUpperCase()}_${key}`] || process.env[key]
}

const env = async (root, environment) => {
  const template = fs.readFileSync(path.join(__dirname, 'env.ejs'), 'utf8')
  const data = ejs.render(template, {
    getValue: getValue(environment)
  })
  fs.writeFileSync(path.join(root,'.env'), data, 'utf8')
}

export default env
