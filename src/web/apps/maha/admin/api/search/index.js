import { Route } from '../../../../../core/backframe'
import collectObjects from '../../../../../core/utils/collect_objects'

const searchFiles = collectObjects('admin/search.js')

const processor = async (req, trx, options) => {

  const query = req.query.q.toLowerCase()

  const term = `%${query.replace(' ', '%')}%`

  return await Promise.reduce(searchFiles, async (combined, searchFile) => {

    const models = searchFile.default

    if(!models || Object.keys(models).length === 0) return combined

    const results = await Promise.reduce(Object.keys(models), async (results, model) => {

      const config = models[model]

      const vector = config.fields.join(' || \' \' || ')

      const result = await config.model.query(qb => {

        qb.where({ team_id: req.team.get('id') })

        qb.whereRaw(`lower(${vector}) LIKE '${term}'`)

      }).fetchAll({
        withRelated: config.withRelated,
        transacting: trx
      })

      if(result.length === 0) return results

      return {
        ...results,
        [model]: {
          color: searchFile.config.color,
          icon: config.icon || searchFile.config.icon,
          results: result.map(config.serializer)
        }
      }

    }, {})

    return {
      ...combined,
      ...results
    }

  }, {})

}

const searchRoute = new Route({
  method: 'get',
  path: '/search',
  processor
})

export default searchRoute
