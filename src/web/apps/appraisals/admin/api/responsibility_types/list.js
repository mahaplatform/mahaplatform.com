import ResponsibilityTypeSerializer from '../../../serializers/responsibility_type_serializer'
import ResponsibilityType from '../../../models/responsibility_type'

const listRoute = async (req, res) => {

  const responsibility_types = await ResponsibilityType.fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(responsibility_types, ResponsibilityTypeSerializer)

}

export default listRoute
