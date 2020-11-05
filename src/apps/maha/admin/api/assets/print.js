import { getPDFData } from '@apps/maha/services/assets'
import Asset from '@apps/maha/models/asset'

const printRoute = async (req, res) => {

  const asset = await Asset.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  const data = await getPDFData(asset)

  res.status(200).type('application/pdf').send(data)

}

export default printRoute
