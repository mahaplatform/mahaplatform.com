import EmailSerializer from '../../../serializers/email_serializer'
import Email from '../../../models/email'
import { Resources } from 'maha'

const defaultParams = (req, trx, options) => ({
  site_id: req.params.site_id
})

const defaultQuery = (req, trx, qb, options) => {

  qb.where('site_id', req.params.site_id)

}

const emailsResources = new Resources({
  allowedParams: ['subject','text'],
  defaultParams,
  defaultQuery,
  defaultSort: 'id',
  model: Email,
  only: ['list','update'],
  path: '/sites/:site_id/emails',
  serializer: EmailSerializer
})

export default emailsResources
