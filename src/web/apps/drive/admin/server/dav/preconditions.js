import _ from 'lodash'

const preconditions = (req, res, next) => {

  const requestURI = req.originalUrl.replace(`/admin/drive/dav/${req.params.subdomain}`, '')

  const slashfree = requestURI.replace(/\/+$/, '').replace(/^\/+/, '')

  req.fullpath = decodeURI(slashfree)

  req.label = req.fullpath.split('/').slice(-1)[0]

  req.parent_path = req.fullpath.split('/').slice(0,-1).join('/')

  req.is_metafile = req.label.substr(0,2) === '._' || _.includes(['.DS_Store'], req.label)

  if(req.label.substr(0,15) === '.metadata_never') return res.status(200).send('')

  next()

}

export default preconditions
