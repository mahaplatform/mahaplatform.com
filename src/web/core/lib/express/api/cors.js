import collectObjects from '../../../utils/collect_objects'
import cors from 'cors'
import _ from 'lodash'

const originFiles = collectObjects('origins.js')

const corsMiddleware = async (req, res, next) => {

  var origin = async (origin, callback) => {

    if(!origin) return callback(null, true)

    await Promise.reduce(originFiles, async(whitelist, originFile) => _.uniq([
      ...whitelist,
      ...await originFile.default()
    ]), [process.env.WEB_HOST]).then(whitelist => {

      if(_.includes(whitelist, origin)) return callback(null, true)

      callback(new Error('Invalid origin'))

    })

  }

  return cors({ origin })(req, res, next)

}

export default corsMiddleware
