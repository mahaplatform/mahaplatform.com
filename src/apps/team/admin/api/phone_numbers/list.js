import PhoneNumberSerializer from '@apps/team/serializers/phone_number_serializer'
import PhoneNumber from '@apps/maha/models/phone_number'

const listRoute = async (req, res) => {

  const phone_numbers = await PhoneNumber.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.whereNull('released_at')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['type']
    },
    page: req.query.$page,
    withRelated: ['program.logo'],
    transacting: req.trx
  })

  res.status(200).respond(phone_numbers, PhoneNumberSerializer)

}

export default listRoute
