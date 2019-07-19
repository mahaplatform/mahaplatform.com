const headRoute = async (req, res) => {

  if(req.item.get('content_type')) {
    res.type(req.item.get('content_type'))
  }

  res.status(200).send(null)

}

export default headRoute
