import path from 'path'
import fs from 'fs'

const steps = fs.readdirSync(__dirname).filter(type => {
  return fs.lstatSync(path.join(__dirname, type)).isDirectory()
}).reduce((types, type) => ({
  ...types,
  [type]: fs.readdirSync(path.join(__dirname, type)).reduce((actions, action) => ({
    ...actions,
    [action.replace('.js','')]: require(path.join(__dirname, type, action)).default
  }), {})
}), {})

export default steps
