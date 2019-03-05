import path from 'path'

const mahaRequire = (file) => {

  const module = process.env.NODE_ENV === 'production' ? file.replace('src','dist') : file

  return require(path.resolve(module))

}

export default mahaRequire
