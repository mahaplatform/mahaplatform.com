const route = async (req, res) => {

  const lock_token = req.headers['If'].match(/\(<(.*)>\)/)

  if(lock_token !== null) {
    if(req.item.get('lock_token') !== lock_token[1]) return res.status(403).send(null)
  }

  res.status(200).send()

}

export default route
