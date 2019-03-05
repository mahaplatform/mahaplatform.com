import CompetencySerializer from '../../../serializers/competency_serializer'
import Competency from '../../../models/competency'
import { Resources } from 'maha'

const activity = story => (req, trx, object, options) => ({
  story,
  object
})

const activities = {
  create: activity('created {object}'),
  update: activity('updated {object}'),
  destroy: activity('deleted {object}')
}

const defaultQuery = (req, trx, qb, options) => {

  qb.select(options.knex.raw('distinct on (competencies_competencies.id,competencies_competencies.title,competencies_competencies.level,competencies_competencies.created_at) competencies_competencies.*'))

  qb.leftJoin('competencies_expectations', 'competencies_expectations.competency_id', 'competencies_competencies.id')

  qb.leftJoin('competencies_categories', 'competencies_categories.id', 'competencies_competencies.category_id')

}

const refresh = {
  create: (req, trx, result, options) => [
    '/admin/competencies/competencies'
  ],
  update: (req, trx, result, options) => [
    '/admin/competencies/competencies',
    `/admin/competencies/competencies/${result.get('id')}`
  ]
}

const competencyResources = new Resources({
  activities,
  allowedParams: ['title','description','category_id','level'],
  defaultQuery,
  filterParams: ['category_id','classification_id','level'],
  model: Competency,
  path: '/competencies',
  refresh,
  serializer: CompetencySerializer,
  sortParams: ['id','title','level','competencies_categories.title'],
  searchParams: ['title','description'],
  withRelated: ['category']
})

export default competencyResources
