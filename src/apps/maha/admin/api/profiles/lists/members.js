import Profile from '../../../../models/profile'
import constantcontact from './constantcontact/members'
import mailchimp from './mailchimp/members'

const getMembers = (service) => {
  if(service === 'constantcontact') return constantcontact
  if(service === 'mailchimp') return mailchimp
}

const membersRoute = async (req, res) => {

  const profile = await Profile.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.profile_id )
  }).fetch({
    withRelated: ['source'],
    transacting: req.trx
  })

  if(!profile) return res.status(404).json({
    code: 404,
    message: 'Unable to find profile'
  })

  const members = getMembers(profile.related('source').get('text'))

  const records = await members(req, profile)

  res.status(200).respond(records)

}

export default membersRoute
