import '../web/core/services/environment'
import SearchIndex from 'search-index'
import cheerio from 'cheerio'
import Stream from 'stream'
import glob from 'glob'
import path from 'path'
import fs from 'fs'

const help = async () => {

  const readable = new Stream.Readable({ objectMode: true })

  const helpFiles = path.resolve(__dirname,'..','web','apps','*','help','*.html')

  glob.sync(helpFiles).map((filePath, id) => {
    const matches = filePath.match(/apps\/([^/]*)\/help/)
    const document = fs.readFileSync(filePath, 'utf8')
    const $ = cheerio.load(document)
    const title = $('title').text()
    const rights = $('rights').text()
    const content = $('main').html()
    readable.push({
      id,
      app: matches[1],
      title,
      rights,
      filePath,
      content
    })
  })

  readable.push(null)

  await new Promise((resolve, reject) => SearchIndex({
    indexPath: process.env.NODE_ENV === 'production' ? path.join('dist','help') : path.join('help'),
    logLevel: 'error'
  }, (err, index) => {
    if(err) return reject(err)
    readable.pipe(index.defaultPipeline()).pipe(index.add()).on('finish', () => {
      resolve(index)
    })
  }))

}

help().then(process.exit)
