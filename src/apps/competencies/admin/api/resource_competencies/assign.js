import { Route } from 'maha'
import Resource from '../../../models/resource'

const processor = async (req, trx, options) => {

  const conditions = {
    id: req.params.resource_id
  }

  const resource = await Resource.where(conditions).fetch({ transacting: trx })

  const resource_id = resource.get('id')

  await options.knex('competencies_competencies_resources').transacting(trx).where({ resource_id }).del()

  await Promise.map(req.body.ids, async competency_id => {

    const data = {
      competency_id,
      resource_id
    }

    await options.knex('competencies_competencies_resources').transacting(trx).insert(data)

  })

  return true

}

const refresh = (req, trx, result, options) => [
  `/admin/competencies/resources/${req.params.resource_id}`
]

const rules = {
  ids: 'required'
}

const assignRoute = new Route({
  path: '',
  method: 'patch',
  processor,
  refresh,
  rules
})

export default assignRoute
