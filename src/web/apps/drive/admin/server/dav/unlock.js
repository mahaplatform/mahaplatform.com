import File from '../../../models/file'

const route = async (req, res) => {

  if(req.item.get('lock_token') !== req.lock_token) return res.status(404).send(null)

  const file = await File.query(qb => {
    qb.where('id', req.item.get('item_id'))
  }).fetch({
    transacting: req.trx
  })

  await file.save({
    lock_token: null,
    lock_expires_at: null,
    locked_by_id: null
  }, {
    patch: true,
    transacting: req.trx
  })

  res.set('Lock-Token', req.headers['lock-token'])

  res.status(204).send(null)

}

export default route
