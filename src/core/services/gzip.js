import zlib from 'zlib'

export const gzip = async (data, options = {}) => {
  return await new Promise((resolve, reject) => {
    zlib.gzip(data, options, (err, buffer) => {
      if(err) reject(err)
      resolve(buffer)
    })
  })
}

export const gunzip = async (data, options = {}) => {
  return await new Promise((resolve, reject) => {
    zlib.gunzip(data, options, (err, buffer) => {
      if(err) reject(err)
      resolve(buffer)
    })
  })
}
