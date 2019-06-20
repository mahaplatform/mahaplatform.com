const route = async (req, res) => {

  const lock_token = req.headers['Lock-Token']

  if(req.item.get('lock_token') !== lock_token) return res.status(404).send(null)

  await req.item.save({
    lock_token: null,
    locked_at: null,
    locked_by_id: null
  }, {
    patch: true,
    transacting: req.trx
  })

  res.set('Lock-Token', lock_token)

  res.status(204).send(null)

}

export default route
