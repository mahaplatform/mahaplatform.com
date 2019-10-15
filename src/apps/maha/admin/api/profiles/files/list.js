import Profile from '../../../../models/profile'
import googledrive from './googledrive/list'
import onedrive from './onedrive/list'
import dropbox from './dropbox/list'
import box from './box/list'

const getList = (service) => {
  if(service === 'googledrive') return googledrive
  if(service === 'onedrive') return onedrive
  if(service === 'dropbox') return dropbox
  if(service === 'box') return box
}

const filesRoute = async (req, res) => {

  const profile = await Profile.scope(qb => {
    qb.where('team_id', req.team.get('id'))
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

  const list = getList(profile.related('source').get('text'))

  const records = await list(req, profile)

  res.status(200).respond(records)

}

export default filesRoute
