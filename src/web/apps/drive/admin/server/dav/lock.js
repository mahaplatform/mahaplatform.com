import generateCode from '../../../../../core/utils/generate_code'
import moment from 'moment'
import xml from 'xml'

const route = async (req, res) => {

  if(req.item.get('locked_by_id') && req.item.get('locked_by_id') !== req.user.get('id')) {
    return res.status(423).send(null)
  }

  if(!req.headers['Depth']) {
    return res.status(422).send(null)
  }

  if(false) {
    // user cannot lock
    return res.status(403).send(null)
  }

  const lock_token = generateCode()

  await req.item.save({
    locked_at: moment(),
    locked_by_id: req.user.get('id'),
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
            { 'D:href': lock_token }
          ] },
          { 'D:lockroot': [
            { 'D:href': `${process.env.WEB_HOST}/${req.originalUrl}` }
          ] },
          { 'D:owner': [
            { 'a:href': [
              { _attr: { 'xmlns:a': 'DAV:' } },
              'http://www.apple.com/webdav_fs/'
            ] }
          ] },
          { 'D:timeout': 'Second-3600' }
        ] }
      ] }
    ]
  }, { declaration: true })

  res.set('Lock-Token', lock_token)

  res.status(200).type('application/xml').send(data)

}

export default route
