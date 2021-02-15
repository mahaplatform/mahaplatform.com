import PhoneNumberSerializer from '@apps/team/serializers/phone_number_serializer'
import PhoneNumber from '@apps/maha/models/phone_number'

const showRoute = async (req, res) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program.logo','voice_campaign'],
    transacting: req.trx
  })

  if(!phone_number) return res.status(404).respond({
    code: 404,
    message: 'Unable to load phone number'
  })

  res.status(200).respond(phone_number, PhoneNumberSerializer)

}

export default showRoute
