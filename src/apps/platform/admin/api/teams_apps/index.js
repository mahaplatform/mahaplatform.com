import { App, ListRoute } from 'maha'
import { AppSerializer } from 'team'

const defaultQuery = (req, trx, qb, options) => {

  qb.whereNot('id', 1)

}

const appsRoute = new ListRoute({
  defaultQuery,
  defaultSort: ['code'],
  path: '/teams/apps',
  model: App,
  method: 'get',
  ownedByTeam: false,
  serializer: AppSerializer
})

export default appsRoute
