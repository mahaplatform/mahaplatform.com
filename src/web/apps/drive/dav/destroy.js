import { moveToTrash } from '../services/items'

const destroyRoute = async (req, res) => {

  if(req.item.get('access_type') === 'view') res.status(403).send(null)

  await req.item.load(['folder'], {
    transacting: req.trx
  })

  await moveToTrash(req, req.item)

  res.status(204).send(null)


}

export default destroyRoute
