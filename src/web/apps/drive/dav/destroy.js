import { moveToTrash } from '../services/items'

const route = async (req, res) => {

  await moveToTrash(req, req.item)

  res.status(204).send(null)


}

export default route
