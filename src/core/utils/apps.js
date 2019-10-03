import path from 'path'
import fs from 'fs'

const appDir = path.join(__dirname,'..','..','apps')

const apps = fs.readdirSync(appDir).filter(item => {
  return fs.lstatSync(path.join(appDir, item)).isDirectory()
})

export default apps
