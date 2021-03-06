import { destroyFolder } from '@apps/drive/services/folders'
import Folder from '@apps/drive/models/folder'

const destroyRoute = async (req, res) => {

  const folder = await Folder.query(qb => {
    qb.where('team_id', req.team.get('id'))
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

  await res.status(200).respond(true)

}

export default destroyRoute
