import imagecache from 'imagecachejs'
import path from 'path'
import _ from 'lodash'

const sources = [
  process.env.DATA_ASSET_HOST,
  process.env.WEB_ASSET_HOST,
  process.env.WEB_HOST
]

const imagecacheMiddleware = imagecache({
  webRoot: path.join('dist', 'public'),
  sources: _.uniq(_.compact(sources))
})

export default imagecacheMiddleware
