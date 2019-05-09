const route = async (req, res) => {
  res.setHeader('Allow', 'PROPPATCH,PROPFIND,OPTIONS,DELETE,UNLOCK,COPY,LOCK,MOVE')
  res.status(200).send()
}

export default route
