import moment from 'moment'
import xml from 'xml'

const item_serializer = (req, item, props, children = []) => xml({
  'D:multistatus': [
    { _attr: { 'xmlns:D': 'DAV:' } },
    ...item ? [ getResponse(req, item, props) ] : [],
    ...children.map(child => getResponse(req, child, props))
  ]
}, { declaration: true })

const getResponse = (req, item, props) => {
  const url = `${process.env.WEB_HOST}/admin/drive/${req.params.subdomain}/${item.get('fullpath')}`
  const found = []
  const missing = []
  if(props['D:creationdate']) {
    const creationdate = moment(item.get('updated_at')).format('YYYY-MM-DD[T]HH:mm:ss[Z]')
    found.push({ 'D:creationdate': [ creationdate ] })
  }
  if(props['D:getlastmodified']) {
    const getlastmodified = moment(item.get('updated_at')).format('ddd, mm MMM YYYY HH:mm:ss [GMT]')
    found.push({ 'D:getlastmodified': [ getlastmodified ] })
  }
  if(item.get('type') === 'file') {
    if(props['D:resourcetype']) found.push({ 'D:resourcetype': null })
    if(props['D:getcontenttype']) {
      found.push({ 'D:getcontenttype': [ item.related('asset').get('content_type') ] })
    }
    if(props['D:getcontentlength']) {
      found.push({ 'D:getcontentlength': [ item.related('asset').get('file_size') ] })
    }
    if(props['D:displayname']) {
      found.push({ 'D:displayname': [ item.related('asset').get('original_file_name') ] })
    }
    if(props['D:getetag']) {
      found.push({ 'D:getetag': [ '0034114ebf4ab656016e01c5774e05b03eb6d66a' ] })
    }
  }
  if(item.get('type') === 'folder') {
    if(props['D:resourcetype']) {
      found.push({ 'D:resourcetype': [ { 'D:collection': null } ] })
    }
    if(props['D:getcontentlength']) missing.push({ 'D:getcontentlength': null })
    if(props['D:quota-available-bytes']) missing.push({ 'D:quota-available-bytes': null })
    if(props['D:quota-used-bytes']) missing.push({ 'D:quota-used-bytes': null })
    if(props['D:quota']) missing.push({ 'D:quota': null })
    if(props['D:quotaused']) missing.push({ 'D:quotaused': null })
  }
  return {
    'D:response': [
      { 'D:href': url },
      ...found.length > 0 ? [{ 'D:propstat': [
        { 'D:status': 'HTTP/1.1 200 OK' },
        { 'D:prop': found }
      ] }] : [],
      ...missing.length > 0 ? [{ 'D:propstat': [
        { 'D:status': 'HTTP/1.1 404 Not Found' },
        { 'D:prop': missing }
      ] }] : []
    ]
  }
}

export default item_serializer
