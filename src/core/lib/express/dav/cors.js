const cors = (req, res, next) => {
  res.setHeader('DAV', '1,2')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Expose-Headers', 'DAV, content-length, Allow')
  res.setHeader('MS-Author-Via', 'DAV')
  res.setHeader('Allow', 'PROPPATCH,PROPFIND,OPTIONS,DELETE,UNLOCK,COPY,LOCK,MOVE,HEAD,POST,PUT,GET')
  if(req.method === 'OPTIONS') return res.status(200).send(null)
  next()
}

export default cors
