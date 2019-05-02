import ReviewSerializer from '../../../serializers/review_serializer'
import Review from '../../../models/review'
import { Resources } from '../../../server'

const afterCreateProcessor = async (req, trx, result, options) => {

  const conditions = {
    reviewable_type: req.params.reviewable_type,
    reviewable_id: req.params.reviewable_id
  }

  const review_average = await options.knex('maha_reviews').transacting(trx).avg('score').where(conditions)

  const review_count = await options.knex('maha_reviews').transacting(trx).count('*').where(conditions)

  const data = {
    review_average: review_average[0].avg,
    review_count: review_count[0].count
  }

  const id = req.params.reviewable_id

  await options.knex(req.params.reviewable_type).transacting(trx).where({ id }).update(data)

}

const defaultQuery = (req, trx, qb, options) => {

  qb.where({ reviewable_type: req.params.reviewable_type })

  qb.where({ reviewable_id: req.params.reviewable_id })

  qb.orderBy('created_at', 'asc')

}

const defaultParams = (req, trx, options) => ({
  user_id: req.user.get('id'),
  reviewable_type: req.params.reviewable_type,
  reviewable_id: req.params.reviewable_id
})

const messages = {
  create: (req, trx, result, options) => ({
    channel: `/admin/${req.params.reviewable_type}/${req.params.reviewable_id}/reviews`,
    action: 'add',
    data: {
      review: ReviewSerializer(req, trx, result)
    }
  }),
  update: (req, trx, result, options) => ({
    channel: `/admin/${req.params.reviewable_type}/${req.params.reviewable_id}/reviews`,
    action: 'replace',
    data: {
      review: ReviewSerializer(req, trx, result)
    }
  }),
  destroy: (req, trx, result, options) => ({
    channel: `/admin/${req.params.reviewable_type}/${req.params.reviewable_id}/reviews`,
    action: 'remove',
    data: {
      uid: req.params.uid
    }
  })
}

const reviewResources = new Resources({
  afterProcessor: {
    create: afterCreateProcessor
  },
  allowedParams: ['uid','score','text'],
  defaultParams,
  defaultQuery,
  messages,
  model: Review,
  only: ['list','create','update','destroy'],
  path: '/:reviewable_type/:reviewable_id/reviews',
  primaryKey: 'uid',
  serializer: ReviewSerializer,
  withRelated: ['user.photo']
})

export default reviewResources
