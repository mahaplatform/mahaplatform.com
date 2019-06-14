import TypeSerializer from '../../../serializers/type_serializer'
import Type from '../../../models/type'

const showRoute = async (req, res) => {

  const type = await Type.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!type) return req.status(404).respond({
    code: 404,
    message: 'Unable to load type'
  })

  res.status(200).respond(type, TypeSerializer)

}

export default showRoute
