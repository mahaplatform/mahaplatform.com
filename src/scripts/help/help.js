import SearchIndex from 'search-index'
import cheerio from 'cheerio'
import Stream from 'stream'
import mkdirp from 'mkdirp'
import glob from 'glob'
import path from 'path'
import fs from 'fs'

const buildHelp = async (root) => {

  const readable = new Stream.Readable({ objectMode: true })

  const helpFiles = path.resolve(__dirname,'..','..','web','apps','*','help','*.html')

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
    indexPath: path.join(root, 'help'),
    logLevel: 'error'
  }, (err, index) => {
    if(err) return reject(err)
    readable.pipe(index.defaultPipeline()).pipe(index.add()).on('finish', () => {
      resolve(index)
    })
  }))

}

export default buildHelp
