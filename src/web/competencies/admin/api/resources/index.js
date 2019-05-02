import { Resources } from 'maha'
import Resource from '../../../models/resource'
import ResourceSerializer from '../../../serializers/resource_serializer'

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

  qb.select(options.knex.raw('distinct on (competencies_resources.id,competencies_resources.title,competencies_resources.review_average,competencies_resources.created_at) competencies_resources.*'))

  qb.leftJoin('competencies_competencies_resources', 'competencies_competencies_resources.resource_id', 'competencies_resources.id')

  qb.leftJoin('competencies_competencies', 'competencies_competencies.id', 'competencies_competencies_resources.competency_id')

  qb.leftJoin('competencies_expectations', 'competencies_expectations.competency_id', 'competencies_competencies_resources.competency_id')

}

const refresh = {
  create: (req, trx, result, options) => [
    '/admin/competencies/resources'
  ],
  update: (req, trx, result, options) => [
    '/admin/competencies/resources',
    `/admin/competencies/resources/${result.get('id')}`
  ]
}

const resourceResources = new Resources({
  activities,
  allowedParams: ['title','description','url','asset_id'],
  defaultQuery,
  defaultSort: 'title',
  filterParams: ['competencies_competencies.id','competencies_expectations.classification_id','competencies_competencies.level'],
  model: Resource,
  path: '/resources',
  refresh,
  searchParams: ['title','description','url'],
  serializer: ResourceSerializer,
  sortParams: ['id','title','description','url','review_average'],
  withRelated: ['asset.user.photo','asset.source']
})

export default resourceResources
