import mkdirp from 'mkdirp'
import path from 'path'
import fs from 'fs'

const base = path.resolve()

export const readFile = async (key) => {
  return fs.readFileSync(path.join(base, key))
}

export const listFiles = async (prefix) => {
  return fs.readdirSync(path.join(base, prefix)).map(file => `${prefix}/${file}`)
}

export const saveFile = async (filedata, filepath, content_type) => {
  const assetpath = path.join(base, ...filepath.split('/').slice(0,-1))
  const assetname = filepath.split('/').pop()
  mkdirp.sync(assetpath)
  fs.writeFileSync(path.join(assetpath, assetname), filedata)
}

export const deleteFiles = async (filepaths) => {
  Promise.mapSeries(filepaths, (filepath, index) => {
    fs.unlinkSync(path.join(base, filepath))
  })
}
