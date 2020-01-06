import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const getValue = (key) => {
  return process.env[`${process.env.NODE_ENV}_${key}`] || process.env[key]
}

const env = async (root) => {
  const template = fs.readFileSync(path.join(__dirname, 'env.ejs'), 'utf8')
  const data = ejs.render(template, { getValue })
  fs.writeFileSync(path.join(root,'.env'), data, 'utf8')
}

export default env
