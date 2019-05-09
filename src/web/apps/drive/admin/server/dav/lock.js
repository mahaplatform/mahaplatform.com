import moment from 'moment'
import xml from 'xml'

const route = async (req, res) => {

  if(req.item.get('locked_at')) return res.status(200).type('application/xml').send()

  await req.item.save({
    locked_at: moment(),
    locked_by_id: req.user.get('id')
  }, {
    patch: true
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
            { 'D:href': 'urn:uuid:69c746b5-b94b-1638-0012-000097316875' }
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

  res.status(200).type('application/xml').send(data)

}

export default route
