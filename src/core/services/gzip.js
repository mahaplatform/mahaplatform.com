import zlib from 'zlib'

export const gzip = async (data) => {
  return await new Promise((resolve, reject) => {
    zlib.gzip(data, (err, buffer) => {
      if(err) reject(err)
      resolve(buffer)
    })
  })
}

export const gunzip = async (data) => {
  return await new Promise((resolve, reject) => {
    zlib.gunzip(data, (err, buffer) => {
      if(err) reject(err)
      resolve(buffer)
    })
  })
}
