import Merchant from '../../../models/merchant'

const editRoute = async (req, res) => {

  const merchant = await Merchant.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!merchant) return res.status(404).respond({
    code: 404,
    message: 'Unable to load merchant'
  })

  res.status(200).respond(merchant, {
    fields: [
      'id',
      'title',
      'integration'
    ]
  })

}

export default editRoute