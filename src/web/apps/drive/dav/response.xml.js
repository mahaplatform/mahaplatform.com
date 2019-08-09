import moment from 'moment'
import etag from 'etag'
import xml from 'xml'

const msprops = ['Win32CreationTime','Win32LastAccessTime','Win32LastModifiedTime','Win32FileAttributes']

const getUrl = (req, item) => {
  const host = `${req.protocol}://${req.headers.host}`
  const parts = [host,'dav',req.params.subdomain]
  if(item.get('fullpath').length > 0) parts.push(item.get('fullpath'))
  const url = encodeURI(parts.join('/'))
  return item.get('type') === 'folder' ? `${url}/` : url
}

const getResponse = (req, item, props) => {
  const url = getUrl(req, item)
  const found = []
  const missing = []
  msprops.map(msprop => {
    if(props[`Z:${msprop}`]) {
      found.push({
        [`a:${msprop}`]: [
          { _attr: { 'xmlns:a': 'urn:schemas-microsoft-com:' } }
        ]
      })
    }
  })
  if(props['D:getlastmodified'] || props['D:allprop']) {
    const getlastmodified = moment(item.get('updated_at')).format('ddd, DD MMM YYYY HH:mm:ss [GMT]')
    found.push({ 'D:getlastmodified': [ getlastmodified ] })
  }
  if(props['D:creationdate'] || props['D:allprop']) {
    const creationdate = moment(item.get('updated_at')).format('YYYY-MM-DD[T]HH:mm:ssZ')
    found.push({ 'D:creationdate': [ creationdate ] })
  }
  if(item.get('type') !== 'folder') {
    if(props['D:resourcetype'] || props['D:allprop']) found.push({ 'D:resourcetype': null })
    if(props['D:getcontenttype'] || props['D:allprop']) {
      found.push({ 'D:getcontenttype': [ item.get('content_type') || '' ] })
    }
    if(props['D:getcontentlength'] || props['D:allprop']) {
      found.push({ 'D:getcontentlength': [ item.get('file_size') || '' ] })
    }
    if(props['D:displayname'] || props['D:allprop']) {
      found.push({ 'D:displayname': [ item.get('label') ] })
    }
    if(props['D:author'] || props['D:allprop']) {
      found.push({ 'D:author': [{
        'D:Name': item.get('owned_by')
      }] })
    }
    if(props['D:getetag'] || props['D:allprop']) {
      found.push({ 'D:getetag': [ etag(item.get('updated_at').toString()).replace(/["]+/g, '') ] })
    }
    if(props['D:supportedlock'] || props['D:allprop']) {
      found.push({
        'D:supportedlock': [{
          'D:lockentry': [{
            'D:lockscope': [{
              'D:exclusive': []
            }],
            'D:locktype': [{
              'D:write': []
            }]
          }]
        }]
      })
    }
    if(props['D:lockdiscovery'] || props['D:allprop'] && item.get('lock_token') !== null) {
      found.push({
        'D:lockdiscovery': [{
          'D:activelock': [{
            'D:locktype': [{
              'D:write': []
            }],
            'D:lockscope': [{
              'D:exclusive': []
            }],
            'D:depth': [0],
            'D:owner': [item.get('locked_by')],
            'D:timeout': ['infinite'],
            'D:locktoken': [{
              'D:href': [item.get('locked_token')]
            }],
            'D:lockroot': [{
              'D:href': ['http://www.example.com/container/']
            }]
          }]
        }]
      })
    }
  }
  if(item.get('type') === 'folder') {
    if(props['D:displayname'] || props['D:allprop']) {
      found.push({ 'D:displayname': [ item.get('label') ] })
    }
    if(props['D:resourcetype'] || props['D:allprop']) {
      found.push({ 'D:resourcetype': [ { 'D:collection': null } ] })
    }
    const namespace = [{ _attr: { 'xmlns:a': 'DAV:' }}]
    if(props['D:getcontentlength']) missing.push({ 'a:getcontentlength': namespace })
    if(props['D:quota-available-bytes']) missing.push({ 'a:quota-available-bytes': namespace })
    if(props['D:quota-used-bytes']) missing.push({ 'a:quota-used-bytes': namespace })
    if(props['D:quota']) missing.push({ 'a:quota': namespace })
    if(props['D:quotaused']) missing.push({ 'a:quotaused': namespace })
  }
  return {
    'D:response': [
      { 'D:href': url },
      ...found.length > 0 ? [{ 'D:propstat': [
        { 'D:status': 'HTTP/1.1 200 OK' },
        { 'D:prop': found }
      ] }] : [],
      ...missing.length > 0 ? [{ 'D:propstat': [
        { 'D:prop': missing },
        { 'D:status': 'HTTP/1.1 404 Not Found' }
      ] }] : []
    ]
  }
}

const response = (req, item, props, children = []) => xml({
  'D:multistatus': [
    { _attr: { 'xmlns:D': 'DAV:' } },
    ...item ? [ getResponse(req, item, props) ] : [],
    ...children.map(child => getResponse(req, child, props))
  ]
}, { declaration: true })

export default response
