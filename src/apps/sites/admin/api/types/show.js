import TypeSerializer from '@apps/sites/serializers/type_serializer'
import Type from '@apps/sites/models/type'

const showRoute = async (req, res) => {

  const type = await Type.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!type) return res.status(404).respond({
    code: 404,
    message: 'Unable to load type'
  })

  await res.status(200).respond(type, TypeSerializer)

}

export default showRoute
