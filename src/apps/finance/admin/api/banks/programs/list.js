import ProgramSerializer from '@apps/crm/serializers/program_serializer'
import Bank from '@apps/finance/models/bank'

const listRoute = async (req, res) => {

  const bank = await Bank.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.bank_id)
  }).fetch({
    withRelated: ['programs.logo'],
    transacting: req.trx
  })

  if(!bank) return res.status(404).respond({
    code: 404,
    message: 'Unable to load bank'
  })

  await res.status(200).respond(bank.related('programs'), (req, program) => ({
    program: ProgramSerializer(req, program)
  }))

}

export default listRoute
