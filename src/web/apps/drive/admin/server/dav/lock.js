import File from '../../../models/file'
import { generateUUID } from './utils'
import moment from 'moment'
import xml from 'xml'

const route = async (req, res) => {

  if(req.item.get('locked_by_id') && req.item.get('locked_by_id') !== req.user.get('id')) {
    return res.status(423).send(null)
  }

  if(req.headers.depth === undefined) {
    return res.status(422).send(null)
  }

  const lock_expires_at = moment().add(1, 'hour')

  const lock_token = generateUUID(lock_expires_at.unix() * 1000)

  const file = await File.query(qb => {
    qb.where('id', req.item.get('item_id'))
  }).fetch({
    transacting: req.trx
  })

  await file.save({
    locked_by_id: req.user.get('id'),
    lock_expires_at,
    lock_token
  }, {
    patch: true,
    transacting: req.trx
  })

  const data = xml({
    'D:prop': [
      { _attr: { 'xmlns:d': 'DAV:' } },
      { 'D:lockdiscovery': [
        { 'D:activelock': [
          { 'D:locktype': [
            { 'write': [] }
          ] },
          { 'D:lockscope': [
            { 'exclusive': [] }
          ] },
          { 'D:locktoken': [
            { 'D:href': `urn:uuid:${lock_token}` }
          ] },
          { 'D:lockroot': [
            { 'D:href': `${process.env.WEB_HOST}/${req.originalUrl}` }
          ] },
          { 'D:owner': [req.user.get('full_name')] },
          { 'D:timeout': 'Second-3600' }
        ] }
      ] }
    ]
  }, { declaration: true })

  res.set('Lock-Token', `urn:uuid:${lock_token}`)

  res.status(200).type('application/xml').send(data)

}

export default route
