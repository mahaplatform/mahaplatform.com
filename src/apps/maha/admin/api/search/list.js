import collectObjects from '../../../../../web/core/utils/collect_objects'

const searchFiles = collectObjects('admin/search.js')

const searchRoute = async (req, res) => {

  const query = req.query.q.toLowerCase()

  const term = `%${query.replace(' ', '%')}%`

  const data = await Promise.reduce(searchFiles, async (combined, searchFile) => {

    const models = searchFile.default

    if(!models || Object.keys(models).length === 0) return combined

    const results = await Promise.reduce(Object.keys(models), async (results, model) => {

      const config = models[model]

      const vector = config.fields.join(' || \' \' || ')

      const result = await config.model.query(qb => {
        qb.where('team_id', req.team.get('id'))
        qb.whereRaw(`lower(${vector}) LIKE '${term}'`)
      }).fetchAll({
        withRelated: config.withRelated,
        transacting: req.trx
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

  res.status(200).respond(data)

}

export default searchRoute
