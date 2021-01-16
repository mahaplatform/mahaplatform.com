import archiver from 'archiver'
import { gzip, gunzip } from './gzip'
import ts from 'tar-stream'
import zlib from 'zlib'
import fs from 'fs'

export const tar = async ({ outfile, files }) => {

  await new Promise((resolve, reject) => {

    var gz = zlib.createGzip()

    const output = fs.createWriteStream(outfile)

    output.on('close', (data) => {
      gzip(data).then(resolve)
    })

    const archive = archiver('tar')

    archive.on('warning', reject)

    archive.on('error', reject)

    archive.pipe(gz).pipe(output)

    files.map(file => {
      archive.append(file.data, {
        name: file.name
      })
    })

    archive.finalize()

  })

}

export const untar = async ({ infile }) => {

  return await new Promise((resolve, reject) => {

    var extract = ts.extract()

    const files = []

    extract.on('entry', (header, stream, next) => {

      const buffers = []

      stream.on('data', (data) => buffers.push(data))

      stream.on('end', function() {
        files.push({
          name: header.name,
          data: Buffer.concat(buffers)
        })
        next()
      })

      stream.resume()

    })

    extract.on('finish', () => {
      resolve(files)
    })

    gunzip(fs.readFileSync(infile)).then(data => {
      extract.end(data)
    })

  })

}
