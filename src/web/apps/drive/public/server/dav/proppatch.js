const getUrl = (req, item) => {
  const host = `${req.protocol}://${req.headers.host}`
  const parts = [host,'dav',req.params.subdomain]
  if(item.get('fullpath').length > 0) parts.push(item.get('fullpath'))
  const url = encodeURI(parts.join('/'))
  return item.get('type') === 'folder' ? `${url}/` : url
}

const route = async (req, res) => {

  const url = getUrl(req, req.item)

  const data = `<?xml version="1.0" encoding="utf-8"?>
<D:multistatus xmlns:D="DAV:">
  <D:response>
    <D:href>${url}</D:href>
    <D:propstat>
      <D:prop>
        <a:Win32LastModifiedTime xmlns:a="urn:schemas-microsoft-com:"/>
        <a:Win32FileAttributes xmlns:a="urn:schemas-microsoft-com:"/>
      </D:prop>
      <D:status>HTTP/1.1 200 OK</D:status>
    </D:propstat>
  </D:response>
</D:multistatus>`

  res.status(207).type('application/xml').send(data)

}

export default route
