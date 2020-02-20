import PhoneNumberSerializer from '../../../serializers/phone_number_serializer'
import PhoneNumber from '../../../../maha/models/phone_number'

const listRoute = async (req, res) => {

  const phone_numbers = await PhoneNumber.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: req.query.$filter,
    filterParams: ['type']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(phone_numbers, PhoneNumberSerializer)

}

export default listRoute
