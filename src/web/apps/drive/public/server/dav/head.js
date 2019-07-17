const route = async (req, res) => {

  res.status(200).type(req.item.get('content_type')).send(null)

}

export default route
