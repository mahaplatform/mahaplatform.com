import MetaFile from '../models/metafile'
import { generateUUID } from './utils'
import File from '../models/file'
import moment from 'moment'
import xml from 'xml'

const lockFile = async (req, file, locked_by) => {

  const lock_expires_at = moment().add(1, 'hour')

  await file.save({
    lock_expires_at,
    locked_by,
    lock_token: generateUUID(lock_expires_at.unix() * 1000)
  }, {
    patch: true,
    transacting: req.trx
  })

}

const lockRoute = async (req, res) => {

  const model = req.item.get('type') === 'file' ? File : MetaFile

  const file = await model.query(qb => {
    qb.where('code', req.item.get('code'))
  }).fetch({
    transacting: req.trx
  })

  const owner = req.body['D:lockinfo']['D:owner'][0]['D:href'][0]

  await lockFile(req, file, owner)

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
            { 'D:href': `urn:uuid:${file.get('lock_token')}` }
          ] },
          { 'D:lockroot': [
            { 'D:href': `${process.env.WEB_HOST}/${req.originalUrl}` }
          ] },
          { 'D:owner': [owner] },
          { 'D:timeout': 'Second-3600' }
        ] }
      ] }
    ]
  }, { declaration: true })

  res.set('Lock-Token', `urn:uuid:${file.get('lock_token')}`)

  res.status(200).type('application/xml').send(data)

}

export default lockRoute
