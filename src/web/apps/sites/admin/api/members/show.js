import MemberSerializer from '../../../serializers/member_serializer'
import Member from '../../../models/member'

const showRoute = async (req, res) => {

  const member = await Member.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!member) return res.status(404).respond({
    code: 404,
    message: 'Unable to load member'
  })

  res.status(200).respond(member, MemberSerializer)

}

export default showRoute
