import PhoneNumberSerializer from '../../../../maha/serializers/phone_number_serializer'
import PhoneNumber from '../../../../maha/models/phone_number'

const listRoute = async (req, res) => {

  const phone_numbers = await PhoneNumber.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('type', 'fax')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['type']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(phone_numbers, PhoneNumberSerializer)

}

export default listRoute
