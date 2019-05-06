import { Plugin } from '../../../backframe'

const defaultQuery = (req, trx, qb, options) => {

  if(options.ownedByTeam !== true || !options.model) return

  const tableName = options.model.extend().__super__.tableName

  qb.whereRaw(`${tableName}.team_id = ?`, req.team.get('id'))

}

const defaultParams = (req, trx, options) => {

  if(options.ownedByTeam !== true) return {}

  return {
    team_id: req.team.get('id')
  }

}

const ownedByTeamPlugin = new Plugin({
  name: 'ownedByTeam',
  defaultParams,
  defaultQuery
})

export default ownedByTeamPlugin
