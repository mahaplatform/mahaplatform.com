import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import generateCode from '../../../../../core/utils/generate_code'
import SiteSerializer from '../../../serializers/site_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Field from '../../../../maha/models/field'
import Manager from '../../../models/manager'
import Origin from '../../../models/origin'
import Email from '../../../models/email'
import Site from '../../../models/site'

const createRoute = async (req, res) => {

  const site = await Site.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['title','requires_member_approval','has_public_member_submission'])
  }).save(null, {
    transacting: req.trx
  })

  await Promise.mapSeries(req.body.origins.split('\n'), async(name) => {
    Origin.forge({
      team_id: req.team.get('id'),
      site_id: site.get('id'),
      name
    }).save(null, {
      transacting: req.trx
    })
  })

  Manager.forge({
    team_id: req.team.get('id'),
    site_id: site.get('id'),
    user_id: req.user.get('id'),
    role: 'administrator'
  }).save(null, {
    transacting: req.trx
  })

  await Manager.forge({
    team_id: req.team.get('id'),
    site_id: site.get('id'),
    user_id: req.user.get('id'),
    role: 'administrator'
  }).save(null, {
    transacting: req.trx
  })

  await Email.forge({
    team_id: req.team.get('id'),
    site_id: site.get('id'),
    code: 'activation',
    subject: 'Activate Your Account',
    text: 'activate your account'
  }).save(null, {
    transacting: req.trx
  })

  await Email.forge({
    team_id: req.team.get('id'),
    site_id: site.get('id'),
    code: 'reset',
    subject: 'Reset Your password',
    text: 'reset your password'
  }).save(null, {
    transacting: req.trx
  })

  await Promise.mapSeries([
    { label: 'First Name', name: 'first_name', type: 'textfield' },
    { label: 'Last Name', name: 'last_name', type: 'textfield' },
    { label: 'Email', name: 'email', type: 'emailfield' }
  ], async(field, delta) => await Field.forge({
    team_id: req.team.get('id'),
    parent_type: 'sites_sites',
    parent_id: site.get('id'),
    code: generateCode(),
    delta,
    ...field,
    config: {},
    is_mutable: false
  }).save(null, {
    transacting: req.trx
  }))

  await site.load(['origins'], {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: site
  })

  await socket.refresh(req, [
    '/admin/sites/sites',
    `/admin/sites/sites/${site.get('id')}`
  ])

  res.status(200).respond(site, SiteSerializer)

}

export default createRoute
