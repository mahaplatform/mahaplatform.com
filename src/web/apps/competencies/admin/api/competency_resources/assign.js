import { Route } from '../../../../../core/backframe'
import Competency from '../../../models/competency'

const processor = async (req, trx, options) => {

  const conditions = {
    id: req.params.competency_id
  }

  const competency = await Competency.where(conditions).fetch({ transacting: trx })

  const competency_id = competency.get('id')

  await options.knex('competencies_competencies_resources').transacting(trx).where({ competency_id }).del()

  await Promise.map(req.body.ids, async resource_id => {

    const data = {
      competency_id,
      resource_id
    }

    await options.knex('competencies_competencies_resources').transacting(trx).insert(data)

  })

  return true

}

const refresh = (req, trx, result, options) => [
  `/admin/competencies/competencies/${req.params.competency_id}`
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
