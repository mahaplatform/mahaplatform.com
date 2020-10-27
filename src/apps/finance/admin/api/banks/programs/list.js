import ProgramSerializer from '../../../../../crm/serializers/program_serializer'
import Bank from '../../../../models/bank'

const listRoute = async (req, res) => {

  const bank = await Bank.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.bank_id)
  }).fetch({
    withRelated: ['programs'],
    transacting: req.trx
  })

  if(!bank) return res.status(404).respond({
    code: 404,
    message: 'Unable to load bank'
  })

  res.status(200).respond(bank.related('programs'), (req, program) => ({
    program: ProgramSerializer(req, program)
  }))

}

export default listRoute