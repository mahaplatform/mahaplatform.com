import googlecontacts from '../../../../maha/admin/api/profiles/contacts/googlecontacts/list'
import constantcontact from '../../../../maha/admin/api/profiles/lists/constantcontact/list'
import mailchimp from '../../../../maha/admin/api/profiles/lists/mailchimp/list'
import outlook from '../../../../maha/admin/api/profiles/contacts/outlook/list'
import ImportItem from '../../../../maha/models/import_item'
import Profile from '../../../../maha/models/profile'
import Import from '../../../../maha/models/import'

const getList = (service) => {
  if(service === 'constantcontact') return constantcontact
  if(service === 'googlecontacts') return googlecontacts
  if(service === 'mailchimp') return mailchimp
  if(service === 'outlook') return outlook
}

const createRoute = async (req, res) => {

  const profile = await Profile.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.body.profile_id )
  }).fetch({
    withRelated: ['source'],
    transacting: req.trx
  })

  if(!profile) return res.status(404).json({
    code: 404,
    message: 'Unable to find profile'
  })

  const list = getList(profile.related('source').get('text'))

  const records = await list(req, profile)

  const _import = await Import.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id')
  }).save(null, {
    transacting: req.trx
  })

  await Promise.mapSeries(records, async (contact) => {

    await ImportItem.forge({
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      import_id: _import.get('id')
    }).save(null, {
      transacting: req.trx
    })

  })

  res.status(200).respond(_import)

}

export default createRoute
