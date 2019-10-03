import path from 'path'
import fs from 'fs'

const prodRoot = path.resolve(__dirname,'..','..','..','public','admin')

const devRoot = path.resolve(__dirname,'..','..','..','..','..')

const getStaticRoot = () => {
  if(process.env.NODE_ENV === 'production') return prodRoot
  return path.join(devRoot,'public','forms')
}

const root = getStaticRoot()

export const readFile = (filename) => {
  const filepath = path.join(root,filename)
  return fs.readFileSync(filepath, 'utf8')
}
