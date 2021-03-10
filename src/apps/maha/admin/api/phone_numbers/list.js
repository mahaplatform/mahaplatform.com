import PhoneNumberSerializer from '@apps/maha/serializers/phone_number_serializer'
import PhoneNumber from '@apps/maha/models/phone_number'

const listRoute = async (req, res) => {

  const phone_numbers = await PhoneNumber.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['type']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  await res.status(200).respond(phone_numbers, PhoneNumberSerializer)

}

export default listRoute
