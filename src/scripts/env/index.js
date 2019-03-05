import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const environment = async () => {

  const template = fs.readFileSync(path.join(__dirname, 'env.ejs'), 'utf8')

  const data = ejs.render(template, process.env)

  fs.writeFileSync(path.resolve('.env'), data, 'utf8')

}

environment().then(process.exit)
