import { moveToTrash } from '../services/items'

const route = async (req, res) => {

  await moveToTrash(req, req.item)

  await req.item.load(['folder'], {
    transacting: req.trx
  })

  res.status(204).send(null)


}

export default route
