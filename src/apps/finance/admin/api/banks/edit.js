import Bank from '@apps/finance/models/bank'

const editRoute = async (req, res) => {

  const bank = await Bank.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['programs'],
    transacting: req.trx
  })

  if(!bank) return res.status(404).respond({
    code: 404,
    message: 'Unable to load bank'
  })

  await res.status(200).respond(bank, {
    fields: [
      'id',
      'title',
      'integration',
      'program_ids'
    ]
  })

}

export default editRoute
