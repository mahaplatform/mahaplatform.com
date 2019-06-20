import User from '../../../../maha/models/user'
import Item from '../../../models/item'

export const cors = (req, res, next) => {
  res.setHeader('DAV', '1,2')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Expose-Headers', 'DAV, content-length, Allow')
  res.setHeader('MS-Author-Via', 'DAV')
  next()
}

export const loadItem = async (req, res, next) => {
  const requestURI = req.originalUrl.replace('/admin/drive/maha', '')
  const slashfree = requestURI.replace(/\/+$/, '').replace(/^\/+/, '')
  const fullpath = decodeURI(slashfree)
  req.item = fullpath.length > 0 ? await Item.query(qb => {
    qb.select('drive_items.*','drive_access_types.text as access_type')
    qb.innerJoin('drive_items_access', 'drive_items_access.code', 'drive_items.code')
    qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
    qb.where('drive_items_access.user_id', req.user.get('id'))
    qb.whereNull('drive_items.deleted_at')
    qb.orderBy('label', 'asc')
    qb.where('fullpath', fullpath)
  }).fetch({
    withRelated: ['asset'],
    transacting: req.trx
  }) : null
  if(req.method !== 'PUT' && fullpath.length > 0 && !req.item) {
    return res.status(404).type('application/xml').send()
  }
  next()
}

export const loadUser = async (username, password, callback) => {
  const user = await User.where('email', username).fetch()
  const authenticated = user ? user.authenticate(password) : false
  callback(authenticated, user)
}
