import Item from '../../../models/item'
import response from './response.xml'
import error from './error.xml'
import moment from 'moment'

const getChildren = async (req, user, item, depth) => {

  if(item.get('type') === 'file') return []

  if(depth === '0') return []

  return await Item.scope({
    team: req.team
  }).query(qb => {
    qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
    qb.whereNull('drive_items.deleted_at')
    if(item.get('id') === null) {
      qb.whereNull('folder_id')
    } else {
      qb.where('folder_id', item.get('item_id'))
    }
    qb.whereRaw('label not like ? ', req.is_windows ? '._%' : '~$%')
    qb.orderBy('label', 'asc')
  }).fetchAll({
    transacting: req.trx
  })

}

const getError = () => {
  return error('D:propfind-finite-depth')
}

const getData = async (req, user, item, props, depth) => {
  const children = await getChildren(req, user, item, depth)
  return response(req, item, props, children)
}

const getProps = (propfind) => {
  if(!propfind || propfind['D:allprop']) return { 'D:allprop': [] }
  return propfind['D:prop'][0]
}

const getRoot = (req) => ({
  get: (prop) => {
    if(prop === 'type') return 'folder'
    if(prop === 'fullpath') return ''
    if(prop === 'label') return req.team.get('subdomain')
    if(prop === 'created_at') return moment()
    if(prop === 'updated_at') return moment()
    return null
  }
})

const route = async (req, res) => {

  if(req.headers.depth && req.headers.depth === 'infinity') {
    return res.status(403).type('application/xml').send(getError())
  }

  const item = req.item || getRoot(req)

  const props = getProps(req.body['D:propfind'])

  const data = await getData(req, req.user, item, props, req.headers.depth)

  res.status(207).type('application/xml').send(data)

}

export default route
