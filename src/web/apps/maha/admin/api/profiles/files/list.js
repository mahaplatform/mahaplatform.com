import Profile from '../../../../models/profile'
import microsoft from './microsoft/list'
import dropbox from './dropbox/list'
import google from './google/list'
import box from './box/list'

const getListCreator = (network) => {
  if(network === 'googledrive') return google
  if(network === 'onedrive') return microsoft
  if(network === 'dropbox') return dropbox
  if(network === 'box') return box
}

const filesRoute = async (req, res) => {

  const profile = await Profile.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id )
  }).fetch({
    withRelated: ['source'],
    transacting: req.trx
  })

  if(!profile) return res.status(404).json({
    code: 404,
    message: 'Unable to find profile'
  })

  const listCreator = getListCreator(profile.related('source').get('text'))

  const records = await listCreator(req, profile)

  console.log(records)

  res.status(200).respond(records)

}

export default filesRoute
