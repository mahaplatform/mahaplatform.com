import '../apps/maha/core/services/environment'
import SearchIndex from 'search-index'
import cheerio from 'cheerio'
import Stream from 'stream'
import glob from 'glob'
import path from 'path'
import fs from 'fs'

const help = async () => {

  const readable = new Stream.Readable({ objectMode: true })

  let index = 0

  process.env.APPS.split(',').map((app, i) => {

    const config = require(path.resolve('src','apps',app,'app.js')).default

    const documents = glob.sync(`src/apps/${app}/help/*.html`)

    documents.map((filePath, j) => {

      const document = fs.readFileSync(filePath, 'utf8')

      const $ = cheerio.load(document)

      const title = $('title').text()

      const rights = $('rights').text()

      const content = $('main').html()

      readable.push({
        id: index + 1,
        app: config.code,
        title,
        rights,
        filePath,
        content
      })

      index += 1

    })

  })

  readable.push(null)

  await new Promise((resolve, reject) => {

    SearchIndex({
      indexPath: path.join('help'),
      logLevel: 'error'
    }, (err, index) => {

      if(err) reject(err)

      readable.pipe(index.defaultPipeline()).pipe(index.add()).on('finish', () => {

        resolve(index)

      })

    })

  })

}

help().then(process.exit)
