import path from 'path'
import _ from 'lodash'

const preconditions = (req, res, next) => {

  const requestURI = req.originalUrl.replace(`/dav/${req.params.subdomain}`, '')

  const slashfree = requestURI.replace(/\/+$/, '').replace(/^\/+/, '')

  req.fullpath = decodeURI(slashfree)

  req.label = req.fullpath.split('/').slice(-1)[0]

  req.parent_path = req.fullpath.split('/').slice(0,-1).join('/')

  req.is_metafile = _.includes(['._','~$','~%'], req.label.substr(0,2)) || _.includes(['.DS_Store'], req.label) || path.extname(req.label) === '.tmp'

  req.is_windows = req.headers['user-agent'].toLowerCase().match(/microsoft/) !== null

  if(req.label.substr(0,15) === '.metadata_never') return res.status(200).send(null)

  next()

}

export default preconditions
