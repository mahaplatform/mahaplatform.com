import SiteSerializer from '../../../serializers/site_serializer'
import { Field, Resources, generateCode } from 'maha'
import Manager from '../../../models/manager'
import Origin from '../../../models/origin'
import Site from '../../../models/site'
import Email from '../../../models/email'
import backup from './backup'

const afterCreate = async (req, trx, result, options) => {

  await Promise.mapSeries(req.body.origins.split('\n'), async(name) => {
    Origin.forge({
      team_id: req.team.get('id'),
      site_id: result.get('id'),
      name
    }).save(null, { transacting: trx })
  })

  Manager.forge({
    team_id: req.team.get('id'),
    site_id: result.get('id'),
    user_id: req.user.get('id'),
    role: 'administrator'
  }).save(null, { transacting: trx })

  await Manager.forge({
    team_id: req.team.get('id'),
    site_id: result.get('id'),
    user_id: req.user.get('id'),
    role: 'administrator'
  }).save(null, { transacting: trx })

  await Email.forge({
    team_id: req.team.get('id'),
    site_id: result.get('id'),
    code: 'activation',
    subject: 'Activate Your Account',
    text: 'activate your account'
  }).save(null, { transacting: trx })

  await Email.forge({
    team_id: req.team.get('id'),
    site_id: result.get('id'),
    code: 'reset',
    subject: 'Reset Your password',
    text: 'reset your password'
  }).save(null, { transacting: trx })

  const fields = [
    { label: 'First Name', name: 'first_name', type: 'textfield' },
    { label: 'Last Name', name: 'last_name', type: 'textfield' },
    { label: 'Email', name: 'email', type: 'emailfield' }
  ]

  await Promise.mapSeries(fields, async(field, delta) => await Field.forge({
    team_id: req.team.get('id'),
    parent_type: 'sites_sites',
    parent_id: result.get('id'),
    code: generateCode(),
    delta,
    ...field,
    config: {},
    is_mutable: false
  }).save(null, { transacting: trx }))

  await result.load(['origins'], { transacting: trx })

}

const afterUpdate = async (req, trx, result, options) => {

  await options.knex('sites_origins').where('site_id', req.params.id).delete()

  await Promise.mapSeries(req.body.origins.split('\n'), async(name) => {
    Origin.forge({
      team_id: req.team.get('id'),
      site_id: result.get('id'),
      name
    }).save(null, { transacting: trx })
  })

  await result.load(['origins'], { transacting: trx })

}

const refresh = {
  create: (req, trx, result, options) => [
    '/admin/sites/sites',
    `/admin/sites/sites/${result.get('id')}`

  ],
  update: (req, trx, result, options) => [
    '/admin/sites/sites',
    `/admin/sites/sites/${result.get('id')}`
  ]
}

const siteResources = new Resources({
  afterProcessor: {
    create: afterCreate,
    update: afterUpdate
  },
  allowedParams: ['title','requires_member_approval','has_public_member_submission'],
  memberActions: [
    backup
  ],
  defaultSort: 'title',
  model: Site,
  path: '/sites',
  refresh,
  serializer: SiteSerializer,
  withRelated: ['origins'],
  virtualParams: ['origins']
})

export default siteResources
