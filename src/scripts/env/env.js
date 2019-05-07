import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const env = async root => {
  const template = fs.readFileSync(path.join(__dirname, 'env.ejs'), 'utf8')
  const data = ejs.render(template, process.env)
  fs.writeFileSync(path.join(root,'.env'), data, 'utf8')
}

export default env
