import { validate } from '../../../../../core/utils/validation'
import Field from '../../../../maha/models/field'
import Site from '../../../models/site'

const signupRoute = async (req, res) => {

  const site = await Site.where({
    id: req.params.site_id
  }).fetch({
    transacting: req.trx
  })

  if(!site) return res.status(404).respond({
    code: 404,
    message: 'Unable to load site'
  })

  const fields = await Field.where({
    parent_type: 'sites_sites',
    parent_id: site.get('id')
  }).fetchAll({
    transacting: req.trx
  })

  const rules = fields.reduce((rules, field) => ({
    ...rules,
    [field.get('name')]: ['required']
  }), {})

  const result = await validate(rules, req.body)

  res.status(200).respond(result)

}

export default signupRoute
