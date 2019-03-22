import Site from '../../../models/site'
import { Field, Route, BackframeError } from 'maha'
import checkit from 'checkit'

const processor = async (req, trx, options) => {

  const site = await Site.where({
    id: req.params.site_id
  }).fetch({ transacting: trx })

  if(!site) {
    throw new BackframeError({
      code: 422,
      message: 'Invalid site'
    })
  }

  const fields = await Field.where({
    parent_type: 'sites_sites',
    parent_id: site.get('id')
  }).fetchAll({ transacting: trx })

  const rules = fields.reduce((rules, field) => {
    return {
      ...rules,
      [field.get('name')]: ['required']
    }
  }, {})

  const result = new checkit(rules).run(req.body)

  return result

}

const signupRoute = new Route({
  method: 'post',
  path: '/signup',
  processor
})

export default signupRoute
