import FilterSerializer from '../../../serializers/filter_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import Filter from '../../../models/filter'

const createRoute = async (req, res) => {

  const filter = await Filter.forge({
    team_id: req.team.get('id'),
    owner_id: req.user.get('id'),
    code: req.params.code,
    ...whitelist(req.body, ['title','description','criteria'])
  }).save(null, {
    transacting: req.trx
  })

  // await socket.refresh(req, [
  //   '/admin/filter/filters'
  // ])

  res.status(200).respond(filter, FilterSerializer)

}

export default createRoute
