import path from 'path'
import fs from 'fs'

const root = path.resolve(__dirname,'..','..','..','..','..','public','forms')

export const readFile = (filename) => {
  const filepath = path.join(root,filename)
  return fs.readFileSync(filepath, 'utf8')
}
