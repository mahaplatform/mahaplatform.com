import Team from '../../../../maha/models/team'
import User from '../../../../maha/models/user'
import Item from '../../../models/item'
import auth from 'http-auth'

const loadUser = async (username, password, callback, req) => {
  const user = await User.scope({
    team: req.team
  }).query(qb => {
    qb.where('email', username)
  }).fetch({
    transacting: req.trx
  })
  const authenticated = user ? user.authenticate(password) : false
  callback(authenticated, user)
}

export const authentication = auth.connect(auth.basic({
  realm: 'MAHA'
}, loadUser))

export const rawParser = (req, res, next) => {
  if(req.method !== 'PUT') return next()
  const chunks = []
  req.on('data', function(chunk) {
    chunks.push(chunk)
  })
  req.on('end', function(chunk) {
    req.rawBody = Buffer.concat(chunks)
    next()
  })
}

export const cors = (req, res, next) => {
  res.setHeader('DAV', '1,2')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Expose-Headers', 'DAV, content-length, Allow')
  res.setHeader('MS-Author-Via', 'DAV')
  res.setHeader('WWW-Authenticate', 'Basic realm="MAHA"')
  res.setHeader('Allow', 'PROPPATCH,PROPFIND,OPTIONS,DELETE,UNLOCK,COPY,LOCK,MOVE,HEAD,POST,PUT,GET')
  next()
}

export const loadHeaders = (req, res, next) => {
  if(req.headers['if']) {
    const if_token = req.headers['if'].match(/urn:uuid:([^>]*)/)
    if(if_token) req.if_token = if_token[1]
  }
  if(req.headers['lock-token']) {
    const token = req.headers['lock-token'].match(/urn:uuid:([^>]*)/)
    if(token) req.lock_token = token[1]
  }
  next()
}

export const loadItem = async (req, res, next) => {
  const requestURI = req.originalUrl.replace(`/admin/drive/${req.params.subdomain}`, '')
  const slashfree = requestURI.replace(/\/+$/, '').replace(/^\/+/, '')
  const fullpath = decodeURI(slashfree)
  if(fullpath.length === 0) return next()
  if(req.method === 'MKCOL') return next()
  req.item = await Item.scope({
    team: req.team
  }).query(qb => {
    qb.select('drive_items.*','drive_access_types.text as access_type')
    qb.innerJoin('drive_items_access', 'drive_items_access.code', 'drive_items.code')
    qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
    qb.where('drive_items_access.user_id', req.user.get('id'))
    qb.whereNull('drive_items.deleted_at')
    qb.where('fullpath', fullpath)
    qb.orderBy('label', 'asc')
  }).fetch({
    withRelated: ['asset','accesses'],
    transacting: req.trx
  })
  if(req.method !== 'PUT' && !req.item) {
    return res.status(404).type('application/xml').send()
  }
  next()
}

export const loadTeam = async (req, res, next) => {
  req.team = await Team.query(qb => {
    qb.where('subdomain', req.params.subdomain)
  }).fetch({
    transacting: req.trx
  })
  next()
}

export const generateUUID = (expirationDate) => {
  const rnd1 = Math.ceil(Math.random() * 0x3FFF) + 0x8000
  const rnd2 = Math.ceil(Math.random() * 0xFFFFFFFF)
  function pad(value : number, nb : number) {
    if(value < 0) value *= -1
    let str = Math.ceil(value).toString(16)
    while(str.length < nb) {
      str = '0' + str
    }
    return str
  }
  let uuid = ''
  uuid += pad(expirationDate & 0xFFFFFFFF, 8)
  uuid += '-' + pad((expirationDate >> 32) & 0xFFFF, 4)
  uuid += '-' + pad(((expirationDate >> (32 + 16)) & 0x0FFF) + 0x1000, 4)
  uuid += '-' + pad((rnd1 >> 16) & 0xFF, 2)
  uuid += pad(rnd1 & 0xFF, 2)
  uuid += '-' + pad(rnd2, 12)
  return uuid
}
