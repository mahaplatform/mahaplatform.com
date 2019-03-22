import { Route } from 'maha'
import Classification from '../../../models/classification'
import Expectation from '../../../models/expectation'

const processor = async (req, trx, options) => {

  const conditions = {
    id: req.params.classification_id
  }

  const classification = await Classification.where(conditions).fetch({ transacting: trx })

  const classification_id = classification.get('id')

  await Expectation.where({ classification_id }).destroy({ transacting: trx })

  await Promise.map(req.body.ids, async competency_id => {

    const data = {
      team_id: req.team.get('id'),
      classification_id,
      competency_id
    }

    await Expectation.forge(data).save(null, { transacting: trx })

  })

  return true

}

const refresh = (req, trx, result, options) => [
  `/admin/competencies/classifications/${req.params.classification_id}`
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
