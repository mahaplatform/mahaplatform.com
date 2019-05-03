import { ListRoute } from '../../../../../core/backframe'
import Source from '../../../models/source'

const serializer = (req, trx, result) => ({
  id: result.get('id'),
  text: result.get('text')
})

const defaultQuery = (req, trx, qb) => {

  qb.whereRaw('id > ?', 4)

}

const sourcesListRoute = new ListRoute({
  defaultQuery,
  defaultSort: 'id',
  model: Source,
  ownedByTeam: false,
  path: '/profiles/sources',
  serializer
})

export default sourcesListRoute
