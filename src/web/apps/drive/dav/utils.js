import Item from '../models/item'

export const loadItem = async (req, res, next) => {
  if(req.fullpath.length === 0) return next()
  if(req.method === 'MKCOL') return next()
  req.item = await Item.scope({
    team: req.team
  }).query(qb => {
    qb.select('drive_items.*','drive_access_types.text as access_type')
    qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
    qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
    qb.whereNull('drive_items.deleted_at')
    qb.where('fullpath', req.fullpath)
  }).fetch({
    transacting: req.trx
  })
  if(req.method !== 'PUT' && !req.item) {
    return res.status(404).type('application/xml').send()
  }
  next()
}

export const generateUUID = (expirationDate) => {
  const rnd1 = Math.ceil(Math.random() * 0x3FFF) + 0x8000
  const rnd2 = Math.ceil(Math.random() * 0xFFFFFFFF)
  function pad(value, nb) {
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
