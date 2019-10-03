import { destroyFolder } from '../../../services/folders'
import Folder from '../../../models/folder'

const destroyRoute = async (req, res) => {

  const folder = await Folder.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['folder'],
    transacting: req.trx
  })

  if(!folder) return res.status(404).respond({
    code: 404,
    message: 'Unable to load folder'
  })

  await destroyFolder(req, folder)

  res.status(200).respond(true)

}

export default destroyRoute
